import React from 'react';
import PropTypes from 'prop-types';
import {TextField, Button} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import {dataStore} from '../../stores';
import './SearchBar.css';

class SearchBar extends React.Component {

  handleTitleInput = event => {
    let value = null;
    if (event.target.value !== "") {
      value = event.target.value;
    }

    dataStore.setTitle(value);
  };

  handleEnterKey = event => {
    if (event.type === "keydown" && event.key === "Enter") {
      this.props.onSearchClick();
    }
  };

  render() {
    return (
      <div className="searchbar-container">
        <TextField
          autoFocus
          id="search"
          label="Film/Serien Titel"
          type="search"
          onChange={this.handleTitleInput}
          onKeyDown={this.handleEnterKey}
          className="searchbar-input"
        />
        <Button
          id="btnSearch"
          variant="contained"
          color="secondary"
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