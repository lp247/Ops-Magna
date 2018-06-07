import moment from 'moment';

let lastDate;

onmessage = (e) => {
	if (e.data === 'STORE_UPDATED') {
		lastDate = moment().format('YYYY-MM-DD');
	}
}

postMessage('UPDATE_STORE');

setInterval(() => {
	let m = moment();
	if (m.second() === 0) {
		postMessage('UPDATE_MINUTE');
		if (moment().isAfter(lastDate, 'day')) {
			postMessage('UPDATE_STORE');
		}
	}
}, 1000);