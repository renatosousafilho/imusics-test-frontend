import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { OauthSender, OauthReceiver } from 'react-oauth-flow';
import UserPanel from './UserPanel';
import ListArtists from './ListArtists';
import { get } from './network'
import './App.css';


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

  handleSuccess = async (accessToken, { response, state }) => {
    console.log('Successfully authorized');
    let opts = { headers: {"Authorization": `Bearer ${accessToken}`}}
    get("/api/v1/following", opts).then(
      (response) => {
        console.log(response.artists.length)
        this.setState({artists: response.artists})
      }
    )
  };

  handleError = error => {
    console.error('An error occured');
    console.error(error.message);
  };



  render() {
    return (
      <div className={'wrapper'}>
       <div className={'container'}>
         <ActionCable
            channel={{ channel: 'MessagesChannel' }}
            onReceived={this.handleReceived}
          />

          <OauthSender
            authorizeUrl="http://localhost:5000/oauth/authorize"
            clientId="817ffd5bf665a8e7b3b849cb8c8993f0f97899ee234daecf0358255e2e647b76"
            redirectUri="http://localhost:3000/auth/doorkeeper/callback"
            render={({ url }) => <a href={url}>Login</a>}
          />

          <OauthReceiver
            tokenUrl="http://localhost:5000/oauth/token"
            clientId="817ffd5bf665a8e7b3b849cb8c8993f0f97899ee234daecf0358255e2e647b76"
            clientSecret="a4b724042d2b064dada6aef357541ce32b47acc30af70dd7a1cea0971c657eb4"
            redirectUri="http://localhost:3000/auth/doorkeeper/callback"
            onAuthSuccess={this.handleSuccess}
            onAuthError={this.handleError}
            render={({ processing, state, error }) => (
              <div>
                {processing && <p>Authorizing now...</p>}
                {error && (
                  <p className="error">An error occured: {error.message}</p>
                )}
              </div>
            )}
          />

          { this.state.artists.length > 0 ? this.state.artists.map(function(a){
                        return <li>{a.name}</li>;
                      }) : null }

          { this.state.artists.length > 0 ? <ListArtists artists={this.state.artists} /> : null }

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
