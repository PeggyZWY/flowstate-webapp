import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	showIntro: true,
	showFinish: false,
	hasFinished: true,
	isSuccess: false,
	lastInMin: 10,
	lastInMinBackup: 10,
	expireInSec: 60,
	expireInSecBackup: 60,
	isFirstTime: false,
	editorHeight: 0,
	content: '',
	contentBase: Math.random(1),
	footerItems: [{
		id: 1,
		name: 'By Wenyi Zhao',
		link: 'http://peggyzwy.github.io/flowstate-webapp/index.html'
	}, {
		id: 2,
		name: 'GitHub',
		link: 'https://github.com/PeggyZWY'
	}, {
		id: 3,
		name: 'ZhiHu',
		link: 'https://www.zhihu.com/people/mu-qing-huan'
	}],
	language: ['English', '中文', '日本語'],
	currentLanIndex: 0,
	text: [ {
		intro: [
			'<div>This may be the most dangerous app. You have to keep writing, or everything will be erased if you stop beyond the expiring time.</div><div>Now set the duration time you want to focus and the exciting expiring time.</div>',
			'Lasts for (minutes):',
			'Expires in (seconds):',
			'Begin'
		],
		finish: [
			'Good job!<br />Would you like to go back and copy what you have written?',
			'Time\'s up :( <br> Be more focus next time.',
			'Again',
			'Reset time',
			'Go back to copy'
		]
	}, {
		intro: [
			'<div>这也许是世界上最危险的写作应用：在你设定的时间段内，如果你停止输入文字超过设定的间隔时间，之前写下的所有内容都会消失。</div><div>现在请设定持续时间段和间隔时间。</div>',
			'持续时间（分）：',
			'间隔时间（秒）：',
			'开始'
		],
		finish: [
			'赞√<br />你想回去复制刚刚写的内容吗？',
			'时间到 _(:3 」∠)_ <br> 下次要更加专心哦~',
			'再来一次',
			'重设时间',
			'回去复制'
		]
	}, {
		intro: [
			'<div>これは世界中の一番危ないアプリかもしれません：あなたのセッティングした間には、書き続けなければなりません。もしそうでなく、全ての入力したデータは削除されます。</div><div>今、持続時間と制限時間をセッティングしましょう！</div>',
			'持続時間（分）：',
			'制限時間（秒）：',
			'スタート'
		],
		finish: [
			'すっごい√<br />戻ってデータを保存していいですか',
			'時間切れ _(:3 」∠)_ <br> 今度は頑張ってくださいね～',
			'もう一度',
			'リセット',
			'戻る'
		]
	}]
});

export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.HIDE_INTRO:
			return state.merge({
				showIntro: false,
				isFirstTime: true,
				hasFinished: false
			});
		case constants.RESTART:
			return state.merge({
				showIntro: true,
				hasFinished: true,
				content: state.get('contentBase'),
				lastInMin: state.get('lastInMinBackup'),
				expireInSec: state.get('expireInSecBackup')
			});
		case constants.CHANGE_FIRST_TIME:
			return state.set('isFirstTime', false)
		case constants.CHANGE_EDITOR_HEIGHT:
			return state.set('editorHeight', action.height - 50);
		case constants.CHANGE_LAST_TIME:
			if (action.firstTime) {
				if (action.value < 0) {
					return state.merge({
						'lastInMin': 10,
						'lastInMinBackup': 10
					});
				} else {
					return state.merge({
						'lastInMin': action.value,
						'lastInMinBackup': action.value
					});
				}
			} else {
				return state.set('lastInMin', action.value);
			}
		case constants.CHANGE_EXPIRE_TIME:
			if (action.firstTime) {
				if (action.value < 0) {
					return state.merge({
						'expireInSec': 60,
						'expireInSecBackup': 60
					});
				} else {
					return state.merge({
						'expireInSec': action.value,
						'expireInSecBackup': action.value
					});
				}
			} else {
				return state.set('expireInSec', action.value);
			}
		case constants.CHANGE_LANGUAGE:
			return state.set('currentLanIndex', action.index);
		case constants.RESET_EXPIRE:
			return state.merge({
				'expireInSec': state.get('expireInSecBackup'),
				'content': action.content
			})
		case constants.FINISH:
			return state.set('hasFinished', true);
		case constants.SET_FAIL:
			return state.merge({
				hasFinished: true,
				showFinish: true,
				isSuccess: false
			});
		case constants.SET_SUCCESS:
			return state.merge({
				hasFinished: true,
				showFinish: true,
				isSuccess: true
			});
		case constants.AGAIN:
			return state.merge({
				showFinish: false,
				hasFinished: false,
				isFirstTime: true,
				lastInMin: state.get('lastInMinBackup'),
				expireInSec: state.get('expireInSecBackup')
			});
		case constants.RESET_TIME:
			return state.merge({
				showIntro: true,
				showFinish: false,
				hasFinished: true,
				isFirstTime: true,
				lastInMin: state.get('lastInMinBackup'),
				expireInSec: state.get('expireInSecBackup')
			});
		case constants.COPY:
			return state.merge({
				showIntro: false,
				showFinish: false,
				lastInMin: '',
				expireInSec: ''			
			});
		default:
			return state;
	}
}
