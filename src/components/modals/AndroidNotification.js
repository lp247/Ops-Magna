/* global Android */

import {Component} from 'react';

class AndroidNotification extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.notificationID = ++AndroidNotification.counter;
		if (AndroidNotification.counter === 99) {
			AndroidNotification.counter = 0;
		}
		console.log(this.notificationID);
	}

	componentDidMount() {
		Android.showNotification(this.props.title + ' (' + this.notificationID + ')', this.props.text, this.notificationID);
	}

	componentWillUnmount() {
		Android.hideNotification(this.notificationID);
	}

	render() {return null;}
}

AndroidNotification.counter = 0;

export default AndroidNotification;