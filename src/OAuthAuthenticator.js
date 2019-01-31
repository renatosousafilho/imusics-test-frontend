import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { get } from './network'
import { OauthSender, OauthReceiver } from 'react-oauth-flow';
import { Nav } from 'react-bootstrap';

import { userUpdated, artistsUpdated } from './oauthActions';

class OAuthAuthenticator extends Component {
  constructor(props) {
    super(props);
  }

  handleSuccess = async (accessToken, { response, state }) => {
    let opts = { headers: {"Authorization": `Bearer ${accessToken}`}}

    get("/api/v1/me", opts).then(
      (response) => {
        this.props.userUpdated(response)
      }
    )

    get("/api/v1/following", opts).then(
      (response) => {
        this.props.artistsUpdated(response)
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
          render={({ url }) => <Nav.Link href={url}>Login</Nav.Link>}
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


const mapStateToProps = (state) => {
  return state.oauth
}

const mapDispatchToProps =
  (dispatch) => bindActionCreators({userUpdated, artistsUpdated}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OAuthAuthenticator);
