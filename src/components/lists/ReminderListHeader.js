import React, {Component} from 'react';

import Header from '../texts/Header';
import GridContainer from '../container/GridContainer';
import ListDropDownButton from './ListDropDownButton';
import DropDownList from './DropDownList';
import BasicLink from '../texts/BasicLink';

// const ReminderLinks = (openNewForm, lang) => [
// 	<DropDownLink onClick={openNewForm}>{NewReminderHeader[lang]}</DropDownLink>
// ];

// const TaskLinks = (openNewForm, openNewTemplateForm, lang) => [
// 	<DropDownLink onClick={openNewForm}>{NewTaskHeader[lang]}</DropDownLink>,
// 	<DropDownLink onClick={openNewTemplateForm}>{EditTaskHeader[lang]}</DropDownLink>
// ];

// const EventLinks = (openNewForm, openNewTemplateForm, lang) => [
// 	<DropDownLink onClick={openNewForm}>{NewEventHeader[lang]}</DropDownLink>,
// 	<DropDownLink onClick={openNewTemplateForm}>{EditEventHeader[lang]}</DropDownLink>
// ];

// const ReminderDropDownList = (openNewForm, lang) => {
// 	return DropDownWrapper(ListContextButton, ReminderLinks(openNewForm, lang), true);
// }
// const TaskDropDownList = (openNewForm, openNewTemplateForm, lang) => {
// 	return DropDownWrapper(ListContextButton, TaskLinks(openNewForm, openNewTemplateForm, lang), true);
// }
// const EventDropDownList = (openNewForm, openNewTemplateForm, lang) => {
// 	return DropDownWrapper(ListContextButton, EventLinks(openNewForm, openNewTemplateForm, lang), true);
// }

class ReminderListHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDropDown: false
		};
		this.toggleDropDown = this.toggleDropDown.bind(this);
	}

	toggleDropDown() {
		this.setState({showDropDown: !this.state.showDropDown});
	}

	render() {
		return (
			<GridContainer gtc='1fr 32px' placement='ml'>
				<Header>{this.props.header}</Header>
				<DropDownList
					ButtonComponent={
						<ListDropDownButton
							up={this.state.showDropDown}
							onClick={this.toggleDropDown}
						/>
					}
					leftAligned={true}
					show={this.state.showDropDown}
				>
					<BasicLink onClick={this.props.openNewForm}>{this.props.formText}</BasicLink>
				</DropDownList>
			</GridContainer>
		);
	}
}

export default ReminderListHeader;

// export const ReminderListHeader = ({openNewForm, lang}) => {
// 	return ListHeader(ReminderDropDownList(openNewForm, lang));
// }
// export const TaskListHeader = ({openNewForm, openNewTemplateForm, lang}) => {
// 	return ListHeader(TaskDropDownList(openNewForm, openNewTemplateForm, lang));
// }
// export const EventListHeader = ({openNewForm, openNewTemplateForm, lang}) => {
// 	return ListHeader(EventDropDownList(openNewForm, openNewTemplateForm, lang));
// }