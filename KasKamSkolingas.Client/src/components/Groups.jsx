import React from 'react';
import { connect } from 'react-redux';
import { GroupContainer } from './Group';
import { setCurrentGroup } from '../action_creators';
import { fetchGroupData } from '../actions';

export class Groups extends React.Component {

  constructor(props) {
    super(props);

    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(group, index) {
    return (
      <button key={index} id={index} 
        onClick={this.onHandleGroupSelect.bind(this, group)}>
        {group}
      </button>
    );
    
  }

  onHandleGroupSelect(group) {
    this.props.dispatch(setCurrentGroup(group));
    fetchGroupData(this.props.dispatch, group);
  }

  render() {
    if(this.props.groups === undefined || this.props.groups === null) {
      return (<div>Error</div>);
    }

    return (
      <div>
        <div>Groups</div>
        {
          this.props.groups.map((group, index) => (
            this.renderButton(group, index)
          ))
        }
        {(this.props.currentGroup !== undefined &&
          this.props.currentGroup !== null &&
          this.props.currentGroup !== '') ? (<GroupContainer />) : (<div></div>) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.getIn(['userData', 'groups']),
    currentGroup: state.get('currentGroup')
  }
}

export const GroupsContainer = connect(mapStateToProps)(Groups);