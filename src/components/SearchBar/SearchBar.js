import React from 'react';
import PropTypes from 'prop-types';
import {TextField, Button} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import {dataStore} from '../../stores';
import './SearchBar.css';

class SearchBar extends React.Component {

  state = {
    title: dataStore.title,
    showProgressbar: false
  };

  handleTitleInput = event => {
    this.setState({
      title: event.target.value
    });
    dataStore.setTitle(event.target.value);
  };

  render() {
    return (
      <div className="searchbar-container">
        <TextField
          autoFocus
          id="search"
          defaultValue={dataStore.vin}
          label="Film/Serien Titel"
          type="search"
          margin="normal"
          onChange={this.handleTitleInput}
          className="searchbar-input"
        />
        <Button
          id="btnSearch"
          variant="contained"
          onClick={this.props.onSearchClick}
          className="searchbar-button"
        >
          <Search/>
          Suche
        </Button>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearchClick: PropTypes.func.isRequired
};

export default SearchBar;