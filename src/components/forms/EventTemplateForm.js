import {connect} from 'react-redux';

import history from '../../utils/history';
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
  removeEventTemplate,
  resetEventTemplateCounter
} from '../../redux/actions/events.actions';
import RawTemplateForm from './RawTemplateForm';

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    entity: state.getIn(['events', 'templates']).find(x => x.get('id') === id),
    header: id === 'new' ? 'Neuer wiederholender Termin' : 'Wiederholenden Termin bearbeiten',
    showDelete: id === 'new'
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
    save: () => {
      dispatch(saveEventTemplate(id));
      history.push('/');
    },
    discard:  () => {
      dispatch(discardEventTemplate(id));
      history.push('/');
    },
    del: () => {
      dispatch(removeEventTemplate(id));
      history.push('/');
    }
  };
}

const EventTemplateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTemplateForm);

export default EventTemplateForm;