import {connect} from 'react-redux';

import Form from './Form';
import {
  updateTaskKey,
  removeTask,
  removeEvent,
  updateEventKey,
  updateTaskBackup,
  updateEventBackup,
  resetTaskData,
  resetEventData,
  ejectNewTask,
  ejectNewEvent,
  updateRuleKey,
  ejectNewRule,
  updateRuleBackup,
  resetRuleData,
  removeRule
} from '../redux/actions';
import history from '../utils/history';

const mapStateToProps = (state, ownProps) => {
  let {type, id} = ownProps.match.params;
  let data;
  if (type === 'task') data = state.get('tasks').find(x => x.getIn(['data', 'id']) === id);
  else if (type === 'event') data = state.get('events').find(x => x.getIn(['data', 'id']) === id);
  else if (type === 'rule') data = state.get('rules').find(x => x.getIn(['data', 'id']) === id);
  return {
    type,
    newEntry: id === 'new',
    data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {type} = ownProps.match.params;
  if (type === 'task') {
    return {
      updateKeyValue: (id, key, value) => {
        dispatch(updateTaskKey(id, key, value));
      },
      save: id => {
        if (id === 'new') {
          dispatch(ejectNewTask());
        } else {
          dispatch(updateTaskBackup(id));
        }
        history.push('/');
      },
      discard: id => {
        dispatch(resetTaskData(id));
        history.push('/');
      },
      del: id => {
        dispatch(removeTask(id));
        history.push('/');
      }
    };
  } else if (type === 'event') {
    return {
      updateKeyValue: (id, key, value) => {
        dispatch(updateEventKey(id, key, value));
      },
      save: id => {
        if (id === 'new') {
          dispatch(ejectNewEvent());
        } else {
          dispatch(updateEventBackup(id));
        }
        history.push('/');
      },
      discard:  id => {
        dispatch(resetEventData(id));
        history.push('/');
      },
      del: id => {
        dispatch(removeEvent(id));
        history.push('/');
      }
    };
  } else if (type === 'rule') {
    return {
      updateKeyValue: (id, key, value) => {
        dispatch(updateRuleKey(id, key, value));
      },
      save: id => {
        if (id === 'new') {
          dispatch(ejectNewRule());
        } else {
          dispatch(updateRuleBackup(id));
        }
        history.push('/');
      },
      discard:  id => {
        dispatch(resetRuleData(id));
        history.push('/');
      },
      del: id => {
        dispatch(removeRule(id));
        history.push('/');
      }
    };
  }
}

const ConnForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default ConnForm;