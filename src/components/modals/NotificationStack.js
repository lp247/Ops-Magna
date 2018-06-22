import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

import {NOTIFICATION_START_MINUTES, NOTIFICATION_END_MINUTES} from '../../utils/constants';
import AndroidNotification from './AndroidNotification';

const RawNotificationStack = ({events, cDate, cTime, lang}) => {
	return events.map(event => {
		let eDate = event.getIn(['data', 'date']);
		let eTime = event.getIn(['data', 'time']);
		let eSumm = event.getIn(['data', 'summ']);
		let eDesc = event.getIn(['data', 'desc']);
		let eMom = moment(eDate + ' ' + eTime, 'YYYY-MM-DD HH:mm');
		let cMom = moment(cDate + ' ' + cTime, 'YYYY-MM-DD HH:mm');
		let show = cMom.isAfter(eMom.clone().subtract(NOTIFICATION_START_MINUTES, 'minutes'))
			&& cMom.isBefore(eMom.clone().add(NOTIFICATION_END_MINUTES, 'minutes'));
		if (show) {
			return <AndroidNotification title={eSumm} text={eDesc} time={eTime} lang={lang} />
		} else {
			return null;
		}
	});
}

const mapStateToProps = state => {
  return {
    events: state.getIn(['events', 'items']).rest(),
		cDate: state.get('date'),
		cTime: state.get('time'),
		lang: state.get('lang')
  }
}

const NotificationStack = connect(
  mapStateToProps
)(RawNotificationStack);

export default NotificationStack;