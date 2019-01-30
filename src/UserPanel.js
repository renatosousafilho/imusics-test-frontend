import React, { Component } from 'react';

class UserPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return (
      <p>Olá, {user.email}</p>
    )
  }
}

export default UserPanel;
