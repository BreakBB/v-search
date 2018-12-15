import React from 'react';
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup';
import GenreItem from "../GenreItem/GenreItem";
import './GenreSelection.css'
import {dataStore} from "../../stores";

class GenreSelection extends React.Component {

  handleSelections = genreTitle => {
    let genres = dataStore.genres;

    if (genres === null) {
      genres = [];
    }
    const selectedIndex = genres.indexOf(genreTitle);

    let newGenres = [];

    if (selectedIndex === -1) {
      newGenres = newGenres.concat(genres, genreTitle);
    } else if (selectedIndex === 0) {
      newGenres = newGenres.concat(genres.slice(1));
    } else if (selectedIndex === genres.length - 1) {
      newGenres = newGenres.concat(genres.slice(0, -1));
    } else if (selectedIndex > 0) {
      newGenres = newGenres.concat(
        genres.slice(0, selectedIndex),
        genres.slice(selectedIndex + 1),
      );
    }

    if (newGenres.length === 0) {
      newGenres = null;
    }

    dataStore.setGenres(newGenres);
  };

  render() {
    return (
      <FormGroup row className="genre-wrapper">
        {this.props.genreList.map(genre => (
          <GenreItem key={genre} title={genre} handleSelection={this.handleSelections}/>
        ))}
      </FormGroup>
    );
  }
}

GenreSelection.propTypes = {
  genreList: PropTypes.array.isRequired
};

export default GenreSelection;