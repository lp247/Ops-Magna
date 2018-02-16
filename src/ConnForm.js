import {connect} from 'react-redux';
// import moment from 'moment';
// import autosize from 'autosize';
// import {List} from 'immutable';

// import {toggleTask, editTask, updateFTT, addTask, newTask} from './actions';
import Form from './Form';
import { updateTaskKey, addTask, addEvent, clearFormdata, removeTask, removeEvent, updateEventKey } from './actions';
import history from './history';
// import Recur from './Recur';
// import {DAY_CHANGE_HOUR} from './constants';

const mapStateToProps = (state, ownProps) => {
  let {type, id} = ownProps.match.params;
  let header;
  if (type === 'task') {
    if (id === 'new') {
      header = 'Neue Aufgabe';
    } else {
      header = 'Aufgabe bearbeiten';
    }
  }
  if (type === 'event') {
    if (id === 'new') {
      header = 'Neuer Termin';
    } else {
      header = 'Termin bearbeiten';
    }
  }
  return {
    header,
    data: state.formData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {type, id} = ownProps.match.params;
  return {
    updateKeyValue: (key, value) => {
      if (type === 'task') dispatch(updateTaskKey(id, key, value));
      else if (type === 'event') dispatch(updateEventKey(id, key, value));
    },
    save: (data) => {
      if (type === 'task') dispatch(addTask(data));
      else if (type === 'event') dispatch(addEvent(data));
    },
    discard: () => {
      dispatch(clearFormdata());
      history.push('/');
    },
    del: id === 'new' ? null : (elid) => {
      if (type === 'task') dispatch(removeTask(elid));
      else if (type === 'event') dispatch(removeEvent(elid));
    }
  }
}

const ConnForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default ConnForm;