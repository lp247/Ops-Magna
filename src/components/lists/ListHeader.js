import React, {Component} from 'react';

import Header from '../texts/Header';
import GridContainer from '../container/GridContainer';
import ListDropDownButton from './ListDropDownButton';
import DropDownList from './DropDownList';
import BasicLink from '../texts/BasicLink';
import FlexContainer from '../container/FlexContainer';
import TextButton from '../buttons/TextButton';

class ListHeader extends Component {
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
		return [
			<GridContainer key='1' gtc='1fr 32px' placement='ml' margin='0 0 24px'>
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
					{this.props.openNewTemplateForm
						? <BasicLink
							onClick={this.props.openNewTemplateForm}
						>{this.props.templateFormText}</BasicLink>
						: null
					}
				</DropDownList>
			</GridContainer>,
			this.props.filterAction
				? <FlexContainer key='2' margin='0 0 24px'>
					<TextButton
						size='small'
						inverted={!this.props.filterActive}
						onClick={this.props.filterAction}
					>{this.props.filterButtonText}</TextButton>
				</FlexContainer>
				: null
		];
	}
}

export default ListHeader;