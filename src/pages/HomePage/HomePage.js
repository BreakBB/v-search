import React from 'react';
import {observer} from 'mobx-react';
import {EstimateDisplay, FilterButton, FilterSelection, GenreSelection, ResultTable, SearchBar} from '../../components';
import CircularProgress from '@material-ui/core/CircularProgress';
import {RATINGS} from "../../components/FilterButton/constants";
import {FormControlLabel, FormGroup, Paper, Switch} from "@material-ui/core/es/index";
import configStore from '../../stores/ConfigStore';
import dataStore from "../../stores/DataStore";
import '../general.css'

class HomePage extends React.Component {

  state = {
    showProgressbar: false,
    data: [],
    estimate: 0
  };

  // The controller is used to abort any fetch calls
  // Whenever a fetch/Promise isn't resolved yet and the component unmounts, it might lead to memory leaks
  controller = new AbortController();

  static handleWindowResize() {
    configStore.setMobile(window.innerWidth <= 600)
  }

  componentWillMount() {
    window.addEventListener('resize', HomePage.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', HomePage.handleWindowResize);
    this.controller.abort();
  }

  onSearchClick = async () => {
    this.setState({showProgressbar: true});

    const response = await fetch(
      configStore.API_MOVIES, {
        'signal': this.controller.signal,
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(dataStore)
      });

    const json = await response.json();

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
      <Paper className="paper-page">
        <SearchBar onSearchClick={this.onSearchClick}/>
        <EstimateDisplay label="Durchsuchen" moviesURL={configStore.API_MOVIES}/>
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
          <br/>
          <FilterButton title="Bewertung" children={RATINGS} dataStoreAction={v => dataStore.setStarRating(v)}/>
          <FilterButton title="IMDb" type="number" dataStoreAction={v => dataStore.setIMDbRating(v)}/>
          <FilterButton title="Jahr" type="date" dataStoreAction={v => dataStore.setYear(v)}/>
          {/*<FilterButton title="FSK" children={FSK} dataStoreAction={v => dataStore.setMaturityRating(v)}/>*/}
        </FilterSelection>
        <GenreSelection genresURL={configStore.API_GENRES}/>
        {
          this.state.showProgressbar
            ?
            <CircularProgress size={100}/>
            :
            null
        }
        <ResultTable data={this.state.data}/>
      </Paper>
    );
  }
}

export default observer(HomePage);