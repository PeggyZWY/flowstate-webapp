import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import {
	ModalWrapper,
	Form,
	Button,
	Language
} from '../style';

class Intro extends PureComponent {

	render() {
		const { hideIntro, lastInMin, expireInSec, changeLastTime, changeExpireTime, 
			currentLanIndex, language, changeLanguage, text } = this.props;
		return (
			<ModalWrapper>
				<div dangerouslySetInnerHTML={{__html: text.getIn([currentLanIndex, 'intro', '0'])}} />

        <Form>
          <label htmlFor='lastTime'>{text.getIn([currentLanIndex, 'intro', '1'])}</label>
          <input id='lastTime' type='number' min='0' value={lastInMin} onChange={changeLastTime}/>
          <label htmlFor='expireTime'>{text.getIn([currentLanIndex, 'intro', '2'])}</label>
          <input id='expireTime' type='number' min='0' value={expireInSec} onChange={changeExpireTime}/>
	      </Form>

	      <Button onClick={hideIntro}>
	      	{text.getIn([currentLanIndex, 'intro', '3'])}
	      </Button>

	      {
	      	language.map((item, index) => {
	      		if (currentLanIndex !== index) {
				      return <Language key={index} onClick={() => changeLanguage(index)}>{item}</Language>
				    }
				    return null;
	      	})
	      }
			</ModalWrapper>
		)
	}
}

const mapState = (state) => ({
	lastInMin: state.get('lastInMin'),
	expireInSec: state.get('expireInSec'),
	currentLanIndex: state.get('currentLanIndex'),
	language: state.get('language'),
	text: state.get('text')
});

const mapDispatch = (dispatch) => ({
	hideIntro() {
		dispatch(actionCreators.hideIntro());
	},
	changeLastTime(e) {
		dispatch(actionCreators.changeLastTime(e.target.value, true))
	},
	changeExpireTime(e) {
		dispatch(actionCreators.changeExpireTime(e.target.value, true))
	},
	changeLanguage(index) {
		dispatch(actionCreators.changeLanguage(index))
	}
});

export default connect(mapState, mapDispatch)(Intro);
