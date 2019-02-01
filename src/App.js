import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userUpdated, logout } from './oauthActions';

import { ActionCable } from 'react-actioncable-provider';
import LoadingSpinner from './LoadingSpinner'
import OAuthAuthenticator from './OAuthAuthenticator';
import ListArtists from './ListArtists';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, NavDropdown, Container, Row } from 'react-bootstrap';


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
    // this.popup.close()
    let user = JSON.parse(data.user)
    this.props.userUpdated(user)
  }

  render() {
    const artists = this.props.artists;

    return (
      <div className={'wrapper'}>
         <ActionCable
            channel={{ channel: 'MessagesChannel' }}
            onReceived={this.handleReceived} />

         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Spotify Client</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              { !this.props.isAuthenticated &&
                <OAuthAuthenticator />
              }

              { !this.props.isAuthenticated &&
                <Nav.Link
                  onClick={this.startAuth}>Login with Spotify</Nav.Link>
              }

              { this.props.isAuthenticated &&
                  <Navbar.Brand>Olá, {this.props.user.email}</Navbar.Brand>
              }

              { this.props.isAuthenticated &&
                  <Nav.Link
                    onClick={this.props.logout}>Logout</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Container>
            { artists.length > 0 &&
              <ListArtists artists={artists} />
            }
        </Container>
     </div>
    );
  }
}

const mapStateToProps = (state) => (state.oauth)

const mapDispatchToProps =
  (dispatch) => bindActionCreators({userUpdated, logout}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
