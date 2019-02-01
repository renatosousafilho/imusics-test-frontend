import React, { Component } from 'react';
import { Alert, Image } from 'react-bootstrap';
class ListArtists extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { artists } = this.props;
    var namesList = artists.map(function(a){
      return (<li keyName={a.id} className="list-group-item"><Image src={a.image_url} style={{width: 64}} roundedCircle />&nbsp;&nbsp;&nbsp;{a.name}</li>);
    })

    return (
      <div>
        <Alert variant="success">Lista de Artistas atualizada com successo.</Alert>
        <ul className="list-group">{ namesList }</ul>
      </div>
    )
  }
}

export default ListArtists;
