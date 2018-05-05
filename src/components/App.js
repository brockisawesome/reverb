import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';

import DISCOGS_TOKEN from '../config/keys';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: []
    };

    this.albumSearch('nirvana');
  }

  albumSearch(term) {
    axios
      .get(`https://api.discogs.com/database/search?q=${term}`, {
        headers: {
          Authorization: `Discogs token=${DISCOGS_TOKEN}`
        }
      })
      .then(albums => this.setState({ albums }));
  }

  render() {
    const albumSearch = _.debounce(term => {
      this.albumSearch(term);
    }, 300);

    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Searchbar onSearchTermChange={albumSearch} />
        </div>
      </React.Fragment>
    );
  }
}
