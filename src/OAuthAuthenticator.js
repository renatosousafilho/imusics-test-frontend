import React, { Component } from 'react';
import { get } from './network'
import { OauthSender, OauthReceiver } from 'react-oauth-flow';

class OAuthAuthenticator extends Component {
  constructor(props) {
    super(props);
  }

  handleSuccess = async (accessToken, { response, state }) => {
    console.log('Successfully authorized');
    let opts = { headers: {"Authorization": `Bearer ${accessToken}`}}
    get("/api/v1/following", opts).then(
      (response) => {
        console.log(response.artists.length)
        this.props.onAuthSuccess(response)
        this.setState({artists: response.artists, isAuthenticated: true})
      }
    )
  };

  handleError = error => {
    console.error('An error occured');
    console.error(error.message);
  };

  render() {
    return (
      <div>
        <OauthSender
          authorizeUrl="http://localhost:5000/oauth/authorize"
          clientId="817ffd5bf665a8e7b3b849cb8c8993f0f97899ee234daecf0358255e2e647b76"
          redirectUri="http://localhost:3000/auth/doorkeeper/callback"
          render={({ url }) => <a className="btn btn-primary" href={url}>Login with Dookeper!!!!</a>}
        />

        <OauthReceiver
          tokenUrl="http://localhost:5000/oauth/token"
          clientId="817ffd5bf665a8e7b3b849cb8c8993f0f97899ee234daecf0358255e2e647b76"
          clientSecret="a4b724042d2b064dada6aef357541ce32b47acc30af70dd7a1cea0971c657eb4"
          redirectUri="http://localhost:3000/auth/doorkeeper/callback"
          onAuthSuccess={this.handleSuccess}
          onAuthError={this.handleError}
        />
      </div>
    )
  }
}

export default OAuthAuthenticator;
