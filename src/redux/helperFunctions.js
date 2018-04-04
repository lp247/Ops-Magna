import {List} from 'immutable';

/**
 * Toggle a period list of a task template or event template
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} period 'months', 'weeks' or 'days' as toggle selection.
 * @param {List|number} value Toggle value (can be List for full List toggling).
 */
export function togglePeriod(state, id, period, value) {
  let index = state.findIndex(x => x.get('id') === id);
  let clearDays = false;
  let clearWeeks = false;
  let mod;
  if (index > -1) {

    // Clear days, if weeks have been empty before, because on empty weeks the monthly or yearly day
    // selection is enabled and days of months must be cleared before selecting days of weeks.
    if (state.getIn([index, 'template', 'weeks']).size === 0 && period === 'weeks') {
      clearDays = true;
    }

    // Clear days and weeks, if months have been empty before, because on empty months the yearly
    // day and week selection is enabled and days / weeks must be cleared before selecting days /
    // weeks of months.
    if (state.getIn([index, 'template', 'months']).size === 0 && period === 'months') {
      clearDays = true;
      clearWeeks = true;
    }

    // Full list toggle, if value is list.
    if (List.isList(value)) {
      if (state.getIn([index, 'template', period]).equals(value)) {
        mod = state.updateIn([index, 'template', period], () => List());
      } else {
        mod = state.updateIn([index, 'template', period], () => value);
      }

    // Toggle single value (add / remove value to / from list).
    } else {
      let valueIndex = state.getIn([index, 'template', period].indexOf(value));
      if (valueIndex > -1) {
        mod = state.updateIn([index, 'template', period], list => list.delete(valueIndex));
      } else {
        mod = state.updateIn([index, 'template', period], list => list.push(value));
      }

    }

    // Clear days like before, but the other way round.
    if (mod.getIn([index, 'template', 'weeks']).size === 0 && period === 'weeks') {
      clearDays = true;
    }

    // Clear days and weeks like before, but the other way round.
    if (mod.getIn([index, 'template', 'months']).size === 0 && period === 'months') {
      clearDays = true;
      clearWeeks = true;
    }

    // Clear days, if boolean is set.
    if (clearDays) {
      mod = mod.updateIn([index, 'template', 'days'], () => List());
    }

    // Clear weeks, if boolean is set.
    if (clearWeeks) {
      mod = mod.updateIn([index, 'template', 'weeks'], () => List());
    }

    // Return modified value.
    return mod;

  } else {
    return state;
  }
}

/**
 * Update a single field of a task (template) or event (template).
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} field Name of field to be updated.
 * @param {string|number} value New value.
 */
export function updateValue(state, id, field, value) {
  let index = state.findIndex(x => x.get('id') === id);
  if (index > -1) {
    return state.setIn([index, 'template', field], value);
  } else {
    return state;
  }
}

/**
 * Increment a number of a task (template) or event (template).
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} field Name of field to be updated.
 */
export function incrementValue(state, id, field) {
  let index = state.findIndex(x => x.get('id') === id);
  if (index > -1) {
    return state.setIn([index, 'template', field], state.getIn([index, 'template', field]) + 1);
  } else {
    return state;
  }
}