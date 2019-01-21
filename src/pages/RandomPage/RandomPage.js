import React from 'react';
import {arrayBufferToBase64, getRandomInt, processMovie} from "../../utilities";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/es/Typography/Typography";
import "./RandomPage.css"
import '../general.css';
import authStore from "../../stores/AuthStore";
import configStore from "../../stores/ConfigStore";
import Button from "@material-ui/core/es/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";
import MovieDetails from "../../components/MovieDetails/MovieDetails";


class RandomPage extends React.Component {

  state = {
    estimate: 0,
    randomMovie: null
  };

  // The controller is used to abort any fetch calls
  // Whenever a fetch/Promise isn't resolved yet and the component unmounts, it might lead to memory leaks
  controller = new AbortController();

  componentWillUnmount() {
    this.controller.abort();
  }

  componentDidMount() {
    // Here .then is used instead of async/await since "componentDidMount" is not an async method
    this.fetchGenreNumbers().then((estimate) => {
      this.getRandomMovie(estimate);
    });
  }

  getRandomMovie = async (estimate) => {
    if (estimate > 0) {
      const randomNumber = getRandomInt(estimate);

      const response = await fetch(configStore.API_MOVIES + randomNumber, {
        'signal': this.controller.signal,
        'method': 'get',
        'headers': {
          'User-Id': authStore.userId
        }
      });
      const randomMovie = await response.json();

      this.setState({
        randomMovie: processMovie(randomMovie),
        estimate: estimate
      });
    }
  };

  fetchGenreNumbers = async () => {
    const response = await fetch(configStore.API_MOVIES + 'estimate', {'signal': this.controller.signal});
    return await response.json();
  };

  getNewMovie = () => {
    this.getRandomMovie(this.state.estimate);
  };

  render() {
    if (this.state.randomMovie) {
      return (
        <Paper className="paper-page">
          <div className="random-page movie-item">
            <Typography align="center" variant="h6" color="inherit">
              {
                this.state.randomMovie.title
              }
            </Typography>
            <img className="poster pointer"
                 onClick={() => window.open(this.state.randomMovie.url, "_blank")}
                 src={'data:image/jpeg;base64,' + arrayBufferToBase64(this.state.randomMovie.poster.data)} alt="None"
            />
            <MovieDetails movie={this.state.randomMovie}/>
            <Button
              id="btnNoVote"
              variant="contained"
              color="secondary"
              className="random-page btn-no-vote"
              onClick={this.getNewMovie}>
              Neue/r Serie/Film
            </Button>
          </div>
        </Paper>
      );
    }
    else {
      return (
        <CircularProgress size={80}/>
      );
    }
  }
}

export default RandomPage;