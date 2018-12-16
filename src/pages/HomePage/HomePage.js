import React from 'react';
import {authenticationStore, dataStore} from '../../stores';
import {observer} from 'mobx-react';
import {FilterButton, SearchBar} from '../../components';
import './HomePage.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {IMDB_RATINGS, RATINGS, YEARS, FSK} from "../../components/FilterButton/constants";
import ResultTable from "../../components/ResultTable/ResultTable";
import {Paper, Toolbar, Typography} from "@material-ui/core/es/index";
import GenreSelection from "../../components/GenreSelection/GenreSelection";
import {BACKEND_ADDRESS} from "../../app-config";

class HomePage extends React.Component {

  state = {
    showProgressbar: false,
    data: [],
    genres: []
  };

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

  async onSearchClick() {
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
  }

  render() {
    return (
      <Paper className="Home-Page">
        <SearchBar onSearchClick={this.onSearchClick.bind(this)}/>
        <Toolbar className="filter-wrapper">
          <Typography variant="h5" color="inherit" id="filterTitle">
            Filter
          </Typography>
        </Toolbar>
        <div className="filter-wrapper" aria-labelledby="filterTitle">
          <FilterButton title="Bewertung" children={RATINGS} dataStoreAction={v => dataStore.setRating(v)}/>
          <FilterButton title="IMDb" children={IMDB_RATINGS} dataStoreAction={v => dataStore.setIMDb(v)}/>
          <FilterButton title="Jahr" children={YEARS} dataStoreAction={v => dataStore.setYear(v)}/>
          <FilterButton title="FSK" children={FSK} dataStoreAction={v => dataStore.setFSK(v)}/>
        </div>
        <Toolbar className="genre-wrapper">
          <Typography variant="h6" color="inherit" id="genreTitle">
            Genres
          </Typography>
        </Toolbar>
        <GenreSelection aria-labelledby="genreTitle"
                        genreList={this.state.genres}/>
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