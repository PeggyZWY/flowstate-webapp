import React, { Component } from 'react';
import { connect } from 'react-redux';
import Intro from './Intro';
import Finish from './Finish';
import {
	FullPageWrapper
} from '../style';

class Modal extends Component {

	render() {
		const { hasFinished, showIntro, showFinish } = this.props;
		
		if (hasFinished) {
			return (<FullPageWrapper>
				{showFinish ? <Finish /> : null}
				{showIntro ? <Intro /> : null}
			</FullPageWrapper>)
		}
	}
}

const mapState = (state) => ({
	hasFinished: state.get('hasFinished'),
	showIntro: state.get('showIntro'),
	showFinish: state.get('showFinish')
});

export default connect(mapState, null)(Modal);
