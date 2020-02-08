import * as React from "react";
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

let timer = undefined;

function Editor(props) {
  const [value, setValue] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState("write");
  const { resetExpire, timerStop, expireInSecBackup, expireInSec, finish, hasFinished, content, contentBase } = props;

  return (
    <div
      className="container" 
      onChange={() => resetExpire(timerStop, expireInSecBackup, hasFinished, value)}
    >
      {hasFinished ? finish(timerStop, expireInSec, hasFinished) : null}
      <ReactMde
        value={content === contentBase ? '' : value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
}

const mapState = (state) => ({
  expireInSecBackup: state.get('expireInSecBackup'),
  expireInSec: state.get('expireInSec'),
  hasFinished: state.get('hasFinished'),
  content: state.get('content'),
  contentBase: state.get('contentBase')
});

const mapDispatch = (dispatch) => ({
  resetExpire(timerStop, expireInSecBackup, hasFinished, content) {
    if (!hasFinished) {
      timerStop();
      clearInterval(timer);
      dispatch(actionCreators.resetExpire(content));

      var expire = expireInSecBackup;
      timer = setInterval(() => {
        expire = (expire - 1).toFixed(0);
        dispatch(actionCreators.changeExpireTime(expire))
      }, 1000);
    }
  },
  finish(timerStop, expireInSec) {
    timerStop(true);
    clearInterval(timer);
    dispatch(actionCreators.finish())
  }
});

export default connect(mapState, mapDispatch)(Editor);
