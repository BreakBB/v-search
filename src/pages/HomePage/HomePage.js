import React from 'react';
import {authenticationStore, configStore, dataStore} from '../../stores';
import {observer} from 'mobx-react';
import {FilterButton, FilterSelection, SearchBar} from '../../components';
import './HomePage.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {RATINGS, FSK} from "../../components/FilterButton/constants";
import ResultTable from "../../components/ResultTable/ResultTable";
import {FormControlLabel, FormGroup, Paper, Switch} from "@material-ui/core/es/index";
import GenreSelection from "../../components/GenreSelection/GenreSelection";
import {BACKEND_ADDRESS} from "../../app-config";

class HomePage extends React.Component {

  state = {
    showProgressbar: false,
    data: [],
    genres: []
  };

  static handleWindowResize() {
    configStore.setMobile(window.innerWidth <= 600)
  }

  componentWillMount() {
    window.addEventListener('resize', HomePage.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', HomePage.handleWindowResize);
  }

  componentDidMount() {
    this.fetchGenres();
  }

  async fetchGenres() {
    const result = await fetch(BACKEND_ADDRESS + '/api/de/genres');
    let genres = await result.json();

    genres = genres.sort();

    this.setState({
      genres: genres
    });
  }

  onSearchClick = async () => {
    this.setState({showProgressbar: true});

    const result = await fetch(
      BACKEND_ADDRESS + "/api/de/movies", {
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(dataStore)
      });

    const json = await result.json();

    this.setState({
      showProgressbar: false,
      data: json
    })
  };

  onSwitchChange = (target) => {
    if (target === "movies") {
      dataStore.setMovies(!dataStore.movies);
    }
    else if (target === "series") {
      dataStore.setSeries(!dataStore.series);
    }
  };

  render() {
    return (
      <Paper className="Home-Page">
        <SearchBar onSearchClick={this.onSearchClick}/>
        <FilterSelection isMobile={configStore.isMobile}>
          <FormGroup row className="form-group">
            <FormControlLabel
              control={
                <Switch checked={dataStore.movies} onChange={() => this.onSwitchChange('movies')}/>
              }
              label="Filme"
            />
            <FormControlLabel
              control={
                <Switch checked={dataStore.series} onChange={() => this.onSwitchChange('series')}/>
              }
              label="Serien"
            />
          </FormGroup>
          <FilterButton title="Bewertung" children={RATINGS} dataStoreAction={v => dataStore.setRating(v)}/>
          <FilterButton title="IMDb" number dataStoreAction={v => dataStore.setIMDb(v)}/>
          <FilterButton title="Jahr" number dataStoreAction={v => dataStore.setYear(v)}/>
          <FilterButton title="FSK" children={FSK} dataStoreAction={v => dataStore.setFSK(v)}/>
        </FilterSelection>
        <GenreSelection aria-labelledby="genreTitle"
                        genreList={this.state.genres}
                        isMobile={configStore.isMobile}
        />
        {
          this.state.showProgressbar
            ?
            <CircularProgress size={100}/>
            :
            null
        }
        <ResultTable data={this.state.data}/>
      </Paper>)
  }
}

export default observer(HomePage);