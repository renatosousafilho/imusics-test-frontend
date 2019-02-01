import React, { Component } from 'react';

import { Container, Alert } from 'react-bootstrap';

class WelcomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container  style={{marginTop: 30 }}>
        <Alert variant="info">Bem vindo. Faça Login para acessar sua lista de artistas.</Alert>
      </Container>
    )
  }
}

export default WelcomeContainer;
