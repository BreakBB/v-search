import React from 'react';
import PropTypes from 'prop-types'
import {observer} from 'mobx-react';
import FormGroup from '@material-ui/core/FormGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GenreItem from '../GenreItem/GenreItem';
import './GenreSelection.css'
import configStore from "../../stores/ConfigStore";
import dataStore from "../../stores/DataStore";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Toolbar,
  Typography
} from "@material-ui/core/es/index";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import FormControl from "@material-ui/core/es/FormControl/FormControl";

class GenreSelection extends React.Component {

  state = {
    genres: [],
    selection: null
  };

  // The controller is used to abort any fetch calls
  // Whenever a fetch/Promise isn't resolved yet and the component unmounts, it might lead to memory leaks
  controller = new AbortController();

  componentDidMount() {
    this.fetchGenres().then((genres) => {
      this.setState({
        genres: genres
      });
    });
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.genresURL !== prevProps.genresURL) {
      dataStore.setGenres([]);

      this.fetchGenres().then((genres) => {
        this.setState({
          genres: genres,
          selection: null
        });
      });
    }
  }

  fetchGenres = async () => {
    const response = await fetch(this.props.genresURL, {
      "signal": this.controller.signal
    });
    let genres = await response.json();

    genres = genres.sort();

    return genres;
  };

  handleSelections = (genreTitle) => {
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

  handleRadioSelection = (event) => {
    const selection = event.target.value;
    this.setState({
      selection: selection
    });
    this.props.onChange(selection);
  };

  render() {
    const typoComp = (
      <Typography variant="h6" color="inherit" id="genreTitle">
        Genres
      </Typography>
    );

    let genreComp = null;
    if (this.props.radioGroup) {
      genreComp = (
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="genreSelection"
            className="genre-wrapper"
            value={this.state.selection}
            onChange={this.handleRadioSelection}
          >
            {
              this.state.genres.map(genre => (
                <GenreItem key={genre} value={genre} label={genre} radioButton/>
              ))
            }
          </RadioGroup>
        </FormControl>
      );
    }
    else {
      genreComp = (
        <FormGroup row className="genre-wrapper">
          {
            this.state.genres.map(genre => (
              <GenreItem key={genre} label={genre}
                         selected={dataStore.genres != null && dataStore.genres.includes(genre)}
                         handleSelection={this.handleSelections}/>
            ))
          }
        </FormGroup>
      );
    }

    if (configStore.isMobile) {
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
  genresURL: PropTypes.string.isRequired,
  radioGroup: PropTypes.bool,
  onChange: PropTypes.func
};

export default observer(GenreSelection);