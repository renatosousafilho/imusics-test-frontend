import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { APP_ID, SECRET_KEY, REDIRECT_URI, TOKEN_URL, AUTHORIZE_URL } from './constants'
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
        console.log(response)
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
          authorizeUrl={AUTHORIZE_URL}
          clientId={APP_ID}
          redirectUri={REDIRECT_URI}
          render={({ url }) => <Nav.Link href={url}>Login</Nav.Link>}
        />

        <OauthReceiver
          tokenUrl={TOKEN_URL}
          clientId={APP_ID}
          clientSecret={SECRET_KEY}
          redirectUri={REDIRECT_URI}
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
