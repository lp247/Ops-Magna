import {connect} from 'react-redux';

import Form from './Form';
import { updateTaskKey, removeTask, removeEvent, updateEventKey, updateTaskBackup, updateEventBackup, resetTaskData, resetEventData, ejectNewTask, ejectNewEvent } from './actions';
import history from './history';

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
    data: type === 'task' ? state.get('tasks').find(t => t.get('data').get('id') === id) : state.get('events').find(e => e.get('data').get('id') === id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {type} = ownProps.match.params;
  return {
    updateKeyValue: type === 'task'
      ? (id, key, value) => {
        dispatch(updateTaskKey(id, key, value));
      }
      : (id, key, value) => {
        dispatch(updateEventKey(id, key, value));
      },
    save: type === 'task'
      ? id => {
        if (id === 'new') {
          dispatch(ejectNewTask());
        } else {
          dispatch(updateTaskBackup(id));
        }
        history.push('/');
      }
      : id => {
        if (id === 'new') {
          dispatch(ejectNewEvent());
        } else {
          dispatch(updateEventBackup(id));
        }
        history.push('/');
      },
    discard: type === 'task'
      ? id => {
        dispatch(resetTaskData(id));
        history.push('/');
      }
      : id => {
        dispatch(resetEventData(id));
        history.push('/');
      },
    del: type === 'task'
      ? id => {
        dispatch(removeTask(id));
        history.push('/');
      }
      : id => {
        dispatch(removeEvent(id));
        history.push('/');
      }
  };
}

const ConnForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default ConnForm;