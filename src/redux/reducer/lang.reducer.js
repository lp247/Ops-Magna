import {TOGGLE_LANGUAGE} from "../actions/lang.actions";

function lang(state = 'en', action) {
  switch (action.type) {
    case TOGGLE_LANGUAGE: {
      if (state === 'en') {
        return 'de';
      }
      return 'en';
    }
    default: {
      return state;
    }
  }
}

export default lang;