import React from 'react';
import { connect } from 'react-redux';

export class Groups extends React.Component {
  render() {
    if(this.props.groups === undefined || this.props.groups === null) {
      return (<div>Error</div>);
    }

    return (
      <div>
      {
        this.props.groups.map((group) => (
          <p>{group}</p>
        ))
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.getIn(['userData', 'groups'])
  }
}

export const GroupsContainer = connect(mapStateToProps)(Groups);