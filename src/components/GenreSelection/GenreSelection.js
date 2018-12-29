import React from 'react';
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GenreItem from '../GenreItem/GenreItem';
import './GenreSelection.css'
import {dataStore} from "../../stores";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Toolbar,
  Typography
} from "@material-ui/core/es/index";

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

    const typoComp = (
      <Typography variant="h6" color="inherit" id="genreTitle">
        Genres
      </Typography>
    );

    const genreComp = (
      <FormGroup row className="genre-wrapper">
        {this.props.genreList.map(genre => (
          <GenreItem key={genre} title={genre} handleSelection={this.handleSelections}/>
        ))}
      </FormGroup>
    );

    if (this.props.isMobile) {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            {typoComp}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {genreComp}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }


    return (
      <React.Fragment>
        <Toolbar className="genre-wrapper">
          {typoComp}
        </Toolbar>
        {genreComp}
      </React.Fragment>
    );
  }
}

GenreSelection.propTypes = {
  genreList: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default GenreSelection;