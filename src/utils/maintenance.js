import {fromJS, Map} from 'immutable';

import {unsetShouldSave} from '../redux/actions/shouldSave.actions';
import {updateLastUpdate} from '../redux/actions/tasksEventsUpdate.actions';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return fromJS(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.toJS());
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
};

export const saveStore = (store) => {
  saveState(Map({
    tasks: store.getState().get('tasks'),
    taskTemplates: store.getState().get('taskTemplates'),
    events: store.getState().get('events'),
    eventTemplates: store.getState().get('eventTemplates'),
    rules: store.getState().get('rules'),
    workDate: store.getState().get('workDate')
  }));
}

export const subscriber = (store) => () => {
  if (store.getState().get('shouldSave')) {
    saveStore(store);
    store.dispatch(unsetShouldSave());
  }
}

export const updateStore = (store) => store.dispatch(updateLastUpdate());

// export const removeOldEntries = (store) => {
//   let tasks = store.getState().getIn(['tasks', 'items']);
//   let events = store.getState().getIn(['events', 'items'])
//   let tt = store.getState().getIn(['tasks', 'templates']);
//   let et = store.getState().getIn(['events', 'templates']);
//   for (let i = 1; i < tasks.size; i++) {
//     let old = tasks.getIn([i, 'data', 'done'])
//       && moment().isAfter(tasks.getIn([i, 'data', 'date']), 'day');
//     if (old) store.dispatch(removeTask(tasks.getIn([i, 'id'])));
//   }
//   for (let i = 1; i < events.size; i++) {
//     let old = moment().isAfter(events.getIn([i, 'data', 'date']), 'day');
//     if (old) store.dispatch(removeEvent(events.getIn([i, 'id'])));
//   }
//   for (let i = 1; i < tt.size; i++) {
//     let numChilds = tasks.filter(x => x.get('tid') === tt.getIn([i, 'id'])).size;
//     let afterEnd = moment().isAfter(tt.getIn([i, 'data', 'end']));
//     let counterFull = tt.getIn([i, 'data', 'n']) >= tt.getIn([i, 'data', 'cnt']);
//     let old = numChilds === 0 && (afterEnd || counterFull);
//     if (old) store.dispatch(removeTaskTemplate(tt.getIn([i, 'id'])));
//   }
//   for (let i = 1; i < et.size; i++) {
//     let numChilds = tasks.filter(x => x.get('tid') === tt.getIn([i, 'id'])).size;
//     let afterEnd = moment().isAfter(tt.getIn([i, 'data', 'end']));
//     let counterFull = tt.getIn([i, 'data', 'n']) >= tt.getIn([i, 'data', 'cnt']);
//     let old = numChilds === 0 && (afterEnd || counterFull);
//     if (old) store.dispatch(removeEventTemplate(et.getIn([i, 'id'])));
//   }
// }