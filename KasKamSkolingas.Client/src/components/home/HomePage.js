import React from 'react';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import { fetchHomePageData } from '../../actions';
import { isLoggedIn } from '../../actions/commonActions';
import {
  changeGroupViewToSettings,
  changeGroupViewToDefault,
  changeGroupViewToCreateDebt,
  changeGroupViewToViewDebts,
  changeGroupViewToAddToGroup,
  changeGroupViewToLeaveGroup,
  viewNextDebt,
  viewPreviousDebt,
  groupMainButtonPressed
} from '../../action_creators';
import {
  logOff,
  createGroup
} from '../../actions/homeActions';
import GroupTile from './GroupTile';
import CreateGroup from './CreateGroup';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // When the component mounts, check if user is logged in.
    // If he is, load homepage data, otherwise redirect to landing page
    this.props.isLoggedIn();
  }

  renderGroupTiles(groups = []) {
    return groups.map((group, index) =>
      <Paper key={index} zDepth={4}>
        <GridTile>
          <GroupTile
            index={index}
            view={group.view}
            debtIndex={group.debtIndex}
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
            viewNextDebt={this.props.viewNextDebt}
            viewPreviousDebt={this.props.viewPreviousDebt}
            group={group}
            handleGroupMainButtonPress={this.props.handleGroupMainButtonPress}
          />
        </GridTile>
      </Paper>);
  }

  render() {
    const homePage = this.props.state.homePage || {};
    const groups = homePage.groups;

    return (
      <div>
        <button onClick={this.props.loadHomePageData}>Refresh</button>
        Groups
        <button onClick={this.props.logOff}>Log off</button>
        <div style={styles.root}>
          <GridList
            cellHeight={300}
            cols={4}
          >
            <Subheader>Groups</Subheader>
            {this.renderGroupTiles(groups)}
            <Paper zDepth={4}>
              <GridTile>
                <CreateGroup
                  createGroup={this.props.createGroup}
                />
              </GridTile>
            </Paper>
          </GridList>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadHomePageData: () => {
      dispatch(fetchHomePageData());
    },
    changeViewToSettings: (groupIndex) => {
      dispatch(changeGroupViewToSettings(groupIndex));
    },
    changeViewToDefault: (groupIndex) => {
      dispatch(changeGroupViewToDefault(groupIndex));
    },
    changeViewToCreateDebt: (groupIndex) => {
      dispatch(changeGroupViewToCreateDebt(groupIndex));
    },
    changeViewToViewDebts: (groupIndex) => {
      dispatch(changeGroupViewToViewDebts(groupIndex));
    },
    changeViewToAddToGroup: (groupIndex) => {
      dispatch(changeGroupViewToAddToGroup(groupIndex));
    },
    changeViewToLeaveGroup: (groupIndex) => {
      dispatch(changeGroupViewToLeaveGroup(groupIndex));
    },
    viewNextDebt: (groupIndex) => {
      dispatch(viewNextDebt(groupIndex));
    },
    viewPreviousDebt: (groupIndex) => {
      dispatch(viewPreviousDebt(groupIndex));
    },
    handleGroupMainButtonPress: (groupIndex) => {
      dispatch(groupMainButtonPressed(groupIndex));
    },
    logOff: () => {
      dispatch(logOff());
    },
    isLoggedIn: () => {
      dispatch(isLoggedIn());
    },
    createGroup: (groupName) => {
      dispatch(createGroup(groupName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
