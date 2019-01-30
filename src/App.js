import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import './App.css';


class App extends Component {
  state = {
    user: {},
    disabled: ''
  }

  constructor() {
    super();
    this.handleReceived = this.handleReceived.bind(this);
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
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
    this.setState({user})
  }


  render() {
    return (
      <div className={'wrapper'}>
       <div className={'container'}>
         <ActionCable
            channel={{ channel: 'MessagesChannel' }}
            onReceived={this.handleReceived}
          />

          { this.state.user.email ? 'Olá,' + this.state.user.email : '' }

          <button onClick={this.startAuth}>Login</button>
       </div>
     </div>
    );
  }
}

export default App;
