// Patch for router reducer to enable immutable data types.

import {Map} from 'immutable';

const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";

const initialState = Map({
  location: null,
  action: null
});

const router = (state = initialState, {type, payload} = {}) => {
  if (type === LOCATION_CHANGE) {
    const {location, action} = payload || {};
    return state.set('location', location).set('action', action);
  }

  return state;
}

export default router;