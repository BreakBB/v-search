import React from 'react';
import {API_DE_MOVIES} from "../../app-config";
import {arrayBufferToBase64, getRandomInt} from "../../utilities";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/es/Typography/Typography";


class RandomPage extends React.Component {

  state = {
    estimate: 0,
    randomMovie: null
  };

  componentDidMount() {
    // Here .then is used instead of async/await since "componentDidMount" is not an async method
    this.fetchMovieEstimate().then(() => {
      this.getRandomMovie();
    });
  }

  async getRandomMovie() {
    const estimate = this.state.estimate;
    const randomNumber = getRandomInt(estimate);

    const response = await fetch(API_DE_MOVIES + randomNumber);
    const randomMovie = await response.json();

    this.setState({
      randomMovie: randomMovie
    })
  }

  async fetchMovieEstimate() {
    const response = await fetch(API_DE_MOVIES + 'genreNumbers');
    const estimate = await response.json();

    this.setState({
      genreNumbers: estimate
    });
  }

  render() {
    if (this.state.randomMovie) {
      return (
        <div className="movie-item">
          <Typography align="center" variant="h6" color="inherit">
            {
              this.state.randomMovie.title
            }
          </Typography>
          <img className="poster"
               src={'data:image/jpeg;base64,' + arrayBufferToBase64(this.state.randomMovie.poster.data)} alt="None"
          />
        </div>
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