import React from 'react';

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: ''
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.createGroup(this.state.groupName);
  }

  render() {
    return (
      <div>
        <div>CreateGroup</div>
        <input
          value={this.state.groupName}
          type='text'
          onChange={(e) => this.setState({ groupName: e.target.value })}
        />
        <button type='button' onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  createGroup: React.PropTypes.func.isRequired
};

export default CreateGroup;
