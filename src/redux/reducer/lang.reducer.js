import {SELECT_LANGUAGE} from "../actions/lang.actions";

function lang(state = 'en', action) {
  switch (action.type) {
    case SELECT_LANGUAGE: return action.lang;
    default: return state;
  }
}

export default lang;