/* global Android */

import {Component} from 'react';
import {notificationAtText} from '../../utils/translations';

class AndroidNotification extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.notificationID = ++AndroidNotification.counter;
		if (AndroidNotification.counter === 99) {
			AndroidNotification.counter = 0;
		}
		this.refresh = this.refresh.bind(this);
	}

	refresh() {
		Android.hideNotification(this.notificationID);
		Android.showNotification(
			this.props.title + ' ' + notificationAtText[this.props.lang] + ' ' + this.props.time,
			this.props.text,
			this.notificationID
		);
	}

	componentDidMount() {
		Android.showNotification(
			this.props.title + ' ' + notificationAtText[this.props.lang] + ' ' + this.props.time,
			this.props.text,
			this.notificationID
		);
	}

	componentDidUpdate() {
		this.refresh();
	}

	componentWillUnmount() {
		Android.hideNotification(this.notificationID);
	}

	render() {return null;}
}

AndroidNotification.counter = 0;

export default AndroidNotification;