import React from 'react';

export class CreateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
    }

    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGroupNameChange(e) {
    this.setState({ groupName: e.target.value });
  }

  handleSubmit() {
    
  }

  render() {
    return (
      <div>
        <p>
          Group name: <input type='text' value = {this.state.groupName} onChange={this.handleGroupNameChange} />
        </p>
        <p>
          <button onClick={this.handleSubmit}>Create</button>
        </p>
      </div>
    );
  }
}