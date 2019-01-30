import React, { Component } from 'react';

import { ActionCable } from 'react-actioncable-provider';
import OAuthAuthenticator from './OAuthAuthenticator';
import UserPanel from './UserPanel';
import ListArtists from './ListArtists';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  state = {
    user: {},
    artists: [],
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
  }

  onAuthSuccess = response => {
    this.setState({artists: response.artists, isAuthenticated: true})
  }

  render() {
    return (
      <div className={'wrapper'}>
       <div className={'container'}>
         <ActionCable
            channel={{ channel: 'MessagesChannel' }}
            onReceived={this.handleReceived}
          />

          <button
            className={this.state.isAuthenticated ? 'hidden' : 'btn btn-success'}
            onClick={this.startAuth}>Login with Spotify</button>

          <OAuthAuthenticator onAuthSuccess={this.onAuthSuccess}/>

          <button
              className={!this.state.isAuthenticated ? 'hidden' : 'btn btn-danger'}
              onClick={this.startLogout}>Logout</button>

          <div>
            { this.state.artists.length > 0 ? <ListArtists artists={this.state.artists} /> : null }
          </div>
       </div>
     </div>
    );
  }
}

export default App;
