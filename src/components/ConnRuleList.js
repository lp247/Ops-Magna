import {connect} from 'react-redux';

import {ejectNewRule, updateRuleKey} from './actions';
import RuleList from './RuleList';
import history from '../utils/history';
import taresize from '../utils/taresize';

const mapStateToProps = state => {
  return {
    entries: state.get('rules').rest(),
    fastInputObj: state.getIn(['rules', 0]),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEntry: id => {
      history.push('/rule/' + id);
    },
    fastInputUpdater: e => {
      if (e.target.value.endsWith('\n')) {
        dispatch(ejectNewRule());
      } else {
        dispatch(updateRuleKey('new', 'summ', e.target.value));
        taresize(e.target);
      }
    },
    fastAddEntry: () => {
      dispatch(ejectNewRule());
    }
  }
}

const ConnRuleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RuleList);

export default ConnRuleList;