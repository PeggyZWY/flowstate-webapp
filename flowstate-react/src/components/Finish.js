import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import {
	ModalWrapper,
	Button,
	Language
} from '../style';

class Finish extends PureComponent {

	render() {
		const { currentLanIndex, language, text, changeLanguage, again, resetTime, copy, isSuccess } = this.props;
		return (
			<ModalWrapper>
				{isSuccess ? 
					<div dangerouslySetInnerHTML={{__html: text.getIn([currentLanIndex, 'finish', '0'])}} /> :
					<div dangerouslySetInnerHTML={{__html: text.getIn([currentLanIndex, 'finish', '1'])}} />
				}
        <Button onClick={again}>{text.getIn([currentLanIndex, 'finish', '2'])}</Button>
        <Button onClick={resetTime}>{text.getIn([currentLanIndex, 'finish', '3'])}</Button>
        <Button onClick={copy}>{text.getIn([currentLanIndex, 'finish', '4'])}</Button>
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
	currentLanIndex: state.get('currentLanIndex'),
	language: state.get('language'),
	text: state.get('text'),
	isSuccess: state.get('isSuccess')
});

const mapDispatch = (dispatch) => ({
	changeLanguage(index) {
		dispatch(actionCreators.changeLanguage(index));
	},
	again() {
		dispatch(actionCreators.again());
	},
	resetTime() {
		dispatch(actionCreators.resetTime());
	},
	copy() {
		dispatch(actionCreators.copy());
	}
});

export default connect(mapState, mapDispatch)(Finish);
