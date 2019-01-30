import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import UserPanel from './UserPanel';
import './App.css';


class App extends Component {
  state = {
    user: {},
    isAuthenticated: false
  }

  constructor() {
    super();
    this.handleReceived = this.handleReceived.bind(this);
  }

  startAuth = () => {
    if (!this.state.isAuthenticated) {
      this.popup = this.openPopup()
    }
  }

  startLogout = () => {
    this.setState({user: {}, isAuthenticated: false})
  }


  openPopup() {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `http://localhost:5000/users/auth/spotify`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    )
  }

  handleReceived(data) {
    this.popup.close()
    let user = JSON.parse(data.user)
    this.setState({user, isAuthenticated: true})
    console.log(this.state)
  }


  render() {
    return (
      <div className={'wrapper'}>
       <div className={'container'}>
         <ActionCable
            channel={{ channel: 'MessagesChannel' }}
            onReceived={this.handleReceived}
          />

          { this.state.isAuthenticated ? <UserPanel user={this.state.user} /> : null }

          <button
            className={this.state.isAuthenticated ? 'hidden' : ''}
            onClick={this.startAuth}>Login</button>

          <button
            className={!this.state.isAuthenticated ? 'hidden' : ''}
            onClick={this.startLogout}>Logout</button>
       </div>
     </div>
    );
  }
}

export default App;
