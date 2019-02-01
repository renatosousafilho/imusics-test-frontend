import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userUpdated, logout } from './oauthActions';

import LoadingSpinner from './LoadingSpinner'
import OAuthAuthenticator from './OAuthAuthenticator';
import ListArtists from './ListArtists';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, NavDropdown, Container, Row } from 'react-bootstrap';


class App extends Component {
  constructor() {
    super();
  }


  render() {
    const user = this.props.user;
    const artists = this.props.artists;

    return (
      <div className={'wrapper'}>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Spotify Client</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              { !this.props.isAuthenticated &&
                <OAuthAuthenticator />
              }

              { this.props.isAuthenticated &&
                  <Navbar.Brand>Olá, {user.email}</Navbar.Brand>
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

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    isAuthenticated: state.user.isAuthenticated,
    artists: state.artists.data }
}

const mapDispatchToProps =
  (dispatch) => bindActionCreators({userUpdated, logout}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
