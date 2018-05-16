import {connect} from 'react-redux';

import history from '../../utils/history';
import {
  updateTaskTemplateSummary,
  updateTaskTemplateDescription,
  updateTaskTemplateN,
  toggleTaskTemplateMonth,
  toggleTaskTemplateWeek,
  toggleTaskTemplateDay,
  updateTaskTemplateTime,
  updateTaskTemplateStart,
  updateTaskTemplateEnd,
  saveTaskTemplate,
  discardTaskTemplate,
  removeTaskTemplate,
  resetTaskTemplateCounter
} from '../../redux/actions/tasks.actions';
import RawTemplateForm from './RawTemplateForm';

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    entity: state.getIn(['tasks', 'templates']).find(x => x.get('id') === id),
    header: id === 'new' ? 'Neue wiederholende Aufgabe' : 'Wiederholende Aufgabe bearbeiten',
    showDelete: id === 'new'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateTaskTemplateSummary(id, value)),
    updateDescription: value => dispatch(updateTaskTemplateDescription(id, value)),
    updateN: value => dispatch(updateTaskTemplateN(id, value)),
    toggleMonth: value => dispatch(toggleTaskTemplateMonth(id, value)),
    toggleWeek: value => dispatch(toggleTaskTemplateWeek(id, value)),
    toggleDay: value => dispatch(toggleTaskTemplateDay(id, value)),
    updateTime: value => dispatch(updateTaskTemplateTime(id, value)),
    updateStart: value => dispatch(updateTaskTemplateStart(id, value)),
    updateEnd: value => dispatch(updateTaskTemplateEnd(id, value)),
    save: () => {
      dispatch(saveTaskTemplate(id));
      history.push('/');
    },
    discard: () => {
      dispatch(discardTaskTemplate(id));
      history.push('/');
    },
    del: () => {
      dispatch(removeTaskTemplate(id));
      history.push('/');
    }
  };
}

const TaskTemplateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTemplateForm);

export default TaskTemplateForm;