import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store';
import {
	Header,
	HeaderItem,
	EditorWrapper,
	Footer,
	FooterItem
} from '../style';
import Editor from './Editor';
import Modal from './Modal';
import timeImg from '../statics/img/time.png';
import heartImg from '../statics/img/heart.png';
import bombImg from '../statics/img/bomb.png';
import againImg from '../statics/img/again.png';

let remainingTimer = undefined;
let expireTimer = undefined;

class Compose extends PureComponent {

	// When receiving new input in the editor, 'Editor' component will clear 'remainingTimer' and 'expireTimer' 
	timerStop = (clearRemaining=false) => {
    clearInterval(expireTimer);
    if (clearRemaining) {
    	clearInterval(remainingTimer);
    }
	}

	setTimer = () => {
		const {lastInMin, expireInSec, changeLastTime, changeExpireTime, changeFirstTime } = this.props;

		let remaining = lastInMin;
	  remainingTimer = setInterval(function() {
	  	remaining = (remaining - 0.1).toFixed(1);
      changeLastTime(remaining);
    }, 6000);

		let expire = expireInSec;
		expireTimer = setInterval(() => {
	  	expire = (expire - 1).toFixed(0);
      changeExpireTime(expire);
		}, 1000);

		// Only set timer the first time coming into the editor.
		changeFirstTime();
	}

	render() {
		const { isFirstTime, editorHeight, footerItems, lastInMin,
			expireInSec, expireInSecBackup, showIntro, showFinish, hasFinished, restart } = this.props;

		return (
			<Fragment>
				<Header ref={(header) => {this.header = header}}>
          <HeaderItem>
            <img src={timeImg} alt='lastingTime' />
						<span>{lastInMin + '\''}</span>
          </HeaderItem>
          <HeaderItem>
          	<Link to='/'>
	            <img 
	            	src={hasFinished ? againImg : heartImg} 
	            	onClick={restart}
	            	alt='restart' 
	            />
	          </Link>
          </HeaderItem>
          <HeaderItem>
            <img src={bombImg} alt='expiringTime' />
            <span>{expireInSec + '"'}</span>
          </HeaderItem>
				</Header>

				<EditorWrapper 
					height={editorHeight}
					alpha={expireInSec / expireInSecBackup}
				>
					<Editor timerStop={this.timerStop}/>
				</EditorWrapper>

				<Footer ref={(footer) => {this.footer = footer}}>
					{
						footerItems.map((item) => {
							return <FooterItem href={item.get('link')} key={item.get('id')}>{item.get('name')}</FooterItem>
						})
					}
				</Footer>
				
				{
					(showIntro || showFinish) ? <Modal /> : null
				}
				{ isFirstTime ? this.setTimer() : null }
			</Fragment>
		)
	}

	componentDidMount() {
		const { changeEditorHeight } = this.props;

  	const headerHeight = this.header.clientHeight;
  	const footerHeight = this.footer.clientHeight;
  	let newHeight = window.innerHeight - headerHeight - footerHeight;
  	changeEditorHeight(newHeight);

  	// Change editor's size when window's height is changed
	  window.addEventListener("resize", function() {
	  	newHeight = window.innerHeight - headerHeight - footerHeight;
	  	changeEditorHeight(newHeight);
	  }, false);
	}

	componentDidUpdate() {
		const { expireInSec, lastInMin, setFail, setSuccess, hasFinished } = this.props;

		// If no user input after expiring time, then it has failed.
		if (!hasFinished && expireInSec <= 0 && lastInMin > 0) {
			setFail();
		}

		// If reaching the lasting time, then it's successful.
		if (!hasFinished && lastInMin <= 0) {
			setSuccess();
		}
	}
}

const mapState = (state) => ({
	editorHeight: state.get('editorHeight'),
	footerItems: state.get('footerItems'),
	lastInMin: state.get('lastInMin'),
	expireInSec: state.get('expireInSec'),
	expireInSecBackup: state.get('expireInSecBackup'),
	showIntro: state.get('showIntro'),
	showFinish: state.get('showFinish'),
	isFirstTime: state.get('isFirstTime'),
	hasFinished: state.get('hasFinished')
});

const mapDispatch = (dispatch) => ({
	changeFirstTime() {
		dispatch(actionCreators.changeFirstTime());
	},
	changeEditorHeight(editorHeight) {
		dispatch(actionCreators.changeEditorHeight(editorHeight));
	},
	changeLastTime(value) {
		dispatch(actionCreators.changeLastTime(value));
	},
	changeExpireTime(value) {
		dispatch(actionCreators.changeExpireTime(value));
	},
	setFail() {
		dispatch(actionCreators.setFail());
	},
	setSuccess() {
		dispatch(actionCreators.setSuccess());
	},
	restart() {
		dispatch(actionCreators.restart());
	}
});

export default connect(mapState, mapDispatch)(Compose);
