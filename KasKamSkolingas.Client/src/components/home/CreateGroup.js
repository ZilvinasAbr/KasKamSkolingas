import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
        <TextField
          value={this.state.groupName}
          hintText="Group name"
          onChange={e => this.setState({ groupName: e.target.value })}
        />
        <FlatButton
          label={'Create'}
          onTouchTap={this.handleClick}
          primary
        />
      </div>
    );
  }
}

CreateGroup.propTypes = {
  createGroup: React.PropTypes.func.isRequired
};

export default CreateGroup;
