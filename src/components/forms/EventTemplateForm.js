import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';

import {
  updateEventTemplateSummary,
  updateEventTemplateDescription,
  updateEventTemplateN,
  toggleEventTemplateMonth,
  toggleEventTemplateWeek,
  toggleEventTemplateDay,
  updateEventTemplateTime,
  updateEventTemplateStart,
  updateEventTemplateEnd,
  saveEventTemplate,
  discardEventTemplate,
  removeEventTemplate
} from '../../redux/actions/events.actions';
import RawTemplateForm from './RawTemplateForm';
import {
  NewEventTemplateHeaderText,
  EditEventTemplateHeaderText
} from '../../utils/translations';

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  let lang = state.get('lang');
  return {
    entity: state.getIn(['events', 'templates']).find(x => x.get('id') === id),
    header: id === 'new' ? NewEventTemplateHeaderText[lang] : EditEventTemplateHeaderText[lang],
    showDelete: id === 'new',
    lang
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateEventTemplateSummary(id, value)),
    updateDescription: value => dispatch(updateEventTemplateDescription(id, value)),
    updateN: value => dispatch(updateEventTemplateN(id, value)),
    toggleMonth: value => dispatch(toggleEventTemplateMonth(id, value)),
    toggleWeek: value => dispatch(toggleEventTemplateWeek(id, value)),
    toggleDay: value => dispatch(toggleEventTemplateDay(id, value)),
    updateTime: value => dispatch(updateEventTemplateTime(id, value)),
    updateStart: value => dispatch(updateEventTemplateStart(id, value)),
    updateEnd: value => dispatch(updateEventTemplateEnd(id, value)),
    saveExit: () => {
      // history.go(-1);
      dispatch(goBack());
      dispatch(saveEventTemplate(id));
      // history.push('/');
    },
    discardExit:  () => {
      // history.go(-1);
      dispatch(goBack());
      dispatch(discardEventTemplate(id));
      // history.push('/');
    },
    discard: () => dispatch(discardEventTemplate(id)),
    delExit: () => {
      // history.go(-1);
      dispatch(goBack());
      dispatch(removeEventTemplate(id));
      // history.push('/');
    }
  };
}

const EventTemplateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTemplateForm);

export default EventTemplateForm;