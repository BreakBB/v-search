import React from 'react';
import {configStore, dataStore} from '../../stores';
import {observer} from 'mobx-react';
import {FilterButton, FilterSelection, GenreSelection, ResultTable, SearchBar} from '../../components';
import './HomePage.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {RATINGS, FSK} from "../../components/FilterButton/constants";
import {FormControlLabel, FormGroup, Paper, Switch} from "@material-ui/core/es/index";
import {API_DE_MOVIES} from "../../app-config";
import Typography from "@material-ui/core/es/Typography/Typography";

class HomePage extends React.Component {

  state = {
    showProgressbar: false,
    data: [],
    estimate: 0
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
    this.fetchMovieEstimate();
  }

  async fetchMovieEstimate() {
    const response = await fetch(API_DE_MOVIES + 'estimate');
    const estimate = await response.json();

    this.setState({
      estimate: estimate
    });
  }

  onSearchClick = async () => {
    this.setState({showProgressbar: true});

    const response = await fetch(
      API_DE_MOVIES, {
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
      <Paper className="Home-Page">
        <SearchBar onSearchClick={this.onSearchClick}/>
        <Typography variant="h6">Durchsuchen Sie {this.state.estimate} Filme und Serien</Typography>
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
          <FilterButton title="Bewertung" children={RATINGS} dataStoreAction={v => dataStore.setRating(v)}/>
          <FilterButton title="IMDb" number dataStoreAction={v => dataStore.setIMDb(v)}/>
          <FilterButton title="Jahr" number dataStoreAction={v => dataStore.setYear(v)}/>
          <FilterButton title="FSK" children={FSK} dataStoreAction={v => dataStore.setFSK(v)}/>
        </FilterSelection>
        <GenreSelection/>
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