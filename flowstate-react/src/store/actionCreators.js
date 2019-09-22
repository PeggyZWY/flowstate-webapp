import * as constants from './constants';

export const hideIntro = () => ({
	type: constants.HIDE_INTRO
});

export const changeFirstTime = () => ({
	type: constants.CHANGE_FIRST_TIME
});

export const changeEditorHeight = (height) => ({
	type: constants.CHANGE_EDITOR_HEIGHT,
	height
});

export const changeLastTime = (value, firstTime=false) => ({
	type: constants.CHANGE_LAST_TIME,
	value,
	firstTime
});

export const changeExpireTime = (value, firstTime=false) => ({
	type: constants.CHANGE_EXPIRE_TIME,
	value,
	firstTime
});

export const changeLanguage = (index) => ({
	type: constants.CHANGE_LANGUAGE,
	index
});

export const resetExpire = (content) => ({
	type: constants.RESET_EXPIRE,
	content
});

export const finish = () => ({
	type: constants.FINISH
});

export const setFail = () => ({
	type: constants.SET_FAIL
});

export const setSuccess = () => ({
	type: constants.SET_SUCCESS
});

export const again = () => ({
	type: constants.AGAIN
});

export const resetTime = () => ({
	type: constants.RESET_TIME
});

export const copy = () => ({
	type: constants.COPY
});

export const restart = () => ({
	type: constants.RESTART
})
