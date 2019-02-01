import React, { Component } from 'react';

class ListArtists extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { artists } = this.props;
    var namesList = artists.map(function(a){
      return (<li className="list-group-item"><img src={a.image_url} style={{width: 64}} /> {a.name}</li>);
    })

    return (
      <ul className="list-group">{ namesList }</ul>
    )
  }
}

export default ListArtists;
