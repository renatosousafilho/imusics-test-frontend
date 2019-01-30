import React, { Component } from 'react';

class ListArtists extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { artists } = this.props;
    var namesList = artists.map(function(a){
      return <li>{a.name}</li>;
    })

    return (
      <ul>{ namesList }</ul>
    )
  }
}

export default ListArtists;
