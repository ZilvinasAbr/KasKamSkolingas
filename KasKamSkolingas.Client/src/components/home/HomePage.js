import React from 'react';
import { connect } from 'react-redux';
import { fetchHomePageData } from '../../actions';
import { 
  changeGroupViewToSettings,
  changeGroupViewToDefault,
  changeGroupViewToCreateDebt,
  changeGroupViewToViewDebts,
  changeGroupViewToAddToGroup,
  changeGroupViewToLeaveGroup
} from '../../action_creators';
import GroupTile from './GroupTile';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    this.props.loadHomePageData();
  }

  renderGroupTiles(groups = []) {
    return groups.map((group, index) =>
      <GroupTile
        key={index}
        index={index}
        view={group.view}
        groupName={group.name}
        inDebt={group.inDebt}
        debtTo={group.debtTo}
        debts={group.debts}
        changeViewToSettings={this.props.changeViewToSettings}
        changeViewToDefault={this.props.changeViewToDefault}
        changeViewToCreateDebt={this.props.changeViewToCreateDebt}
        changeViewToViewDebts={this.props.changeViewToViewDebts}
        changeViewToAddToGroup={this.props.changeViewToAddToGroup}
        changeViewToLeaveGroup={this.props.changeViewToLeaveGroup}
      />);
  }

  render() {
    const homePage = this.props.state.homePage || {};
    const groups = homePage.groups;
    
    return (
      <div>
        ZAAAAMBAAA
        {this.renderGroupTiles(groups)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadHomePageData: () => {
      dispatch(fetchHomePageData());
    },
    changeViewToSettings: groupIndex => {
      dispatch(changeGroupViewToSettings(groupIndex));
    },
    changeViewToDefault: groupIndex => {
      dispatch(changeGroupViewToDefault(groupIndex));
    },
    changeViewToCreateDebt: groupIndex => {
      dispatch(changeGroupViewToCreateDebt(groupIndex));
    },
    changeViewToViewDebts: groupIndex => {
      dispatch(changeGroupViewToViewDebts(groupIndex));
    },
    changeViewToAddToGroup: groupIndex => {
      dispatch(changeGroupViewToAddToGroup(groupIndex));
    },
    changeViewToLeaveGroup: groupIndex => {
      dispatch(changeGroupViewToLeaveGroup(groupIndex));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);