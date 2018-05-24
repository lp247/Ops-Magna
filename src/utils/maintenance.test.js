import {fromJS, Map} from 'immutable';

describe('Serialization and deserialization of data', () => {
	it('does not change data', () => {
		let state = Map({number: 1, infinity: -1});
		expect(fromJS(JSON.parse(JSON.stringify(state.toJS())))).toEqual(state);
	});
});