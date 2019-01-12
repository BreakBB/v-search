import React from 'react';
import {arrayBufferToBase64, getRandomInt} from "../../utilities";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/es/Typography/Typography";
import "./RandomPage.css"
import authStore from "../../stores/AuthStore";
import configStore from "../../stores/ConfigStore";
import Button from "@material-ui/core/es/Button/Button";


class RandomPage extends React.Component {

  state = {
    estimate: 0,
    randomMovie: null
  };

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
        'method': 'get',
        'headers': {
          'User-Id': authStore.userId
        }
      });
      const randomMovie = await response.json();

      this.setState({
        randomMovie: randomMovie,
        estimate: estimate
      });
    }
  };

  fetchGenreNumbers = async () => {
    const response = await fetch(configStore.API_MOVIES + 'estimate');
    return await response.json();
  };

  getNewMovie = () => {
    this.getRandomMovie(this.state.estimate);
  };

  render() {
    if (this.state.randomMovie) {
      return (
        <div className="movie-item">
          <Typography align="center" variant="h6" color="inherit">
            {
              this.state.randomMovie.title
            }
          </Typography>
          <img className="poster pointer" onClick={() => window.open(this.state.randomMovie.url, "_blank")}
               src={'data:image/jpeg;base64,' + arrayBufferToBase64(this.state.randomMovie.poster.data)} alt="None"
          />
          <Button
            id="btnNoVote"
            variant="contained"
            color="secondary"
            className="btn-no-vote"
            onClick={this.getNewMovie}>
            Neue/r Serie/Film
          </Button>
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