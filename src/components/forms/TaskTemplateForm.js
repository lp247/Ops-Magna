import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';

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
  removeTaskTemplate
} from '../../redux/actions/tasks.actions';
import RawTemplateForm from './RawTemplateForm';
import {NewTaskTemplateHeaderText, EditTaskTemplateHeaderText} from '../../utils/translations';

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  let lang = state.get('lang');
  return {
    entity: state.getIn(['tasks', 'templates']).find(x => x.get('id') === id),
    header: id === 'new' ? NewTaskTemplateHeaderText[lang] : EditTaskTemplateHeaderText[lang],
    showDelete: id === 'new',
    lang
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
    saveExit: () => {
      dispatch(goBack());
      dispatch(saveTaskTemplate(id));
      // history.push('/');
      // history.go(-1);
    },
    discardExit: () => {
      dispatch(goBack());
      dispatch(discardTaskTemplate(id));
      // history.push('/');
      // history.go(-1);
    },
    discard: () => dispatch(discardTaskTemplate(id)),
    delExit: () => {
      dispatch(goBack());
      dispatch(removeTaskTemplate(id));
      // history.push('/');
      // history.go(-1);
    }
  };
}

const TaskTemplateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTemplateForm);

export default TaskTemplateForm;