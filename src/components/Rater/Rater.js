import React from 'react';
import PropTypes from 'prop-types'
import {observer} from 'mobx-react';
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import './Rater.css'
import '../../pages/general.css'
import {arrayBufferToBase64, getRandomElement} from "../../utilities";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import authStore from "../../stores/AuthStore";
import configStore from "../../stores/ConfigStore";
import VoteButton from "../VoteButton/VoteButton";

class Rater extends React.Component {

  state = {
    genreNumbers: [],
    randomMovie: null,
    outOfMovies: false
  };

  // The controller is used to abort any fetch calls
  // Whenever a fetch/Promise isn't resolved yet and the component unmounts, it might lead to memory leaks
  controller = new AbortController();

  componentWillUnmount() {
    this.controller.abort();
  }

  componentDidMount() {
    // Here .then is used instead of async/await since "componentDidMount" is not an async method
    this.fetchGenreNumbers().then(async () => {
      this.processRandomMovie(await this.getRandomEntry());
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Only update if the genre changed
    if (prevProps.genre !== this.props.genre || prevProps.type !== this.props.type) {
      // Here .then is used instead of async/await since "componentDidUpdate" is not an async method
      this.fetchGenreNumbers().then(async () => {
        this.processRandomMovie(await this.getRandomEntry());
      });
    }
  }

  processRandomMovie = (movie) => {
    if (movie === true) {
      console.log("Error while getting new movie");
      this.setState({
        outOfMovies: true
      });
      return;
    }

    console.log("Found random movie");

    if (this.state.randomMovie) {
      this.setState({
        randomMovie: movie,
        genreNumbers: this.state.genreNumbers.filter((number) => {
          return number !== this.state.randomMovie.number
        }),
        outOfMovies: false
      });
    }
    else {
      // First time called from componentDidMount
      this.setState({
        randomMovie: movie
      });
    }
  };

  getRandomEntry = async () => {
    const genre_numbers = this.state.genreNumbers;
    if (genre_numbers.length === 0) {
      return true;
    }

    const randomNumber = getRandomElement(genre_numbers);

    const response = await fetch(configStore.API_MOVIES + randomNumber, {'signal': this.controller.signal});
    if (response.status === 200) {
      return await response.json();
    }
    return true;
  };

  fetchGenreNumbers = async () => {
    const response = await fetch(
      configStore.API_GENRES + this.props.genre + '/numbers/' + this.props.type, {
        'signal': this.controller.signal,
        'method': 'get',
        'headers': {
          'User-Id': authStore.userId
        }
      });
    const genreNumbers = await response.json();

    this.setState({
      genreNumbers: genreNumbers
    });
  };

  handleNoVote = async () => {
    this.processRandomMovie(await this.getRandomEntry());
  };

  render() {
    let movieItem = null;

    if (this.state.outOfMovies) {
      movieItem = (
        <div className="movie-item">
          <Typography align="center" variant="h6" color="inherit">
            {
              this.props.type === "movie" ?
                "Keinen Film zu dem Genre \"" + this.props.genre + "\" gefunden."
                : "Keine Serie zu dem Genre \"" + this.props.genre + "\" gefunden."
            }
          </Typography>
        </div>
      );
    }
    else if (this.state.randomMovie) {
      const movieId = this.state.randomMovie.movie_id;

      movieItem = (
        <div className="rater wrapper">
          <VoteButton upVote={true} movieId={movieId}
                      onVote={async () => this.processRandomMovie(await this.getRandomEntry())}/>
          <div className="movie-item">
            <Typography align="center" variant="h6" color="inherit">
              {
                this.state.randomMovie.title
              }
            </Typography>
            <img className="poster pointer" onClick={() => window.open(this.state.randomMovie.url, "_blank")}
                 src={'data:image/jpeg;base64,' + arrayBufferToBase64(this.state.randomMovie.poster.data)} alt="None"
            />
          </div>
          <VoteButton upVote={false} movieId={movieId}
                      onVote={async () => this.processRandomMovie(await this.getRandomEntry())}/>
        </div>
      );
    }
    else {
      movieItem = (
        <CircularProgress size={80}/>
      );
    }

    return (
      <React.Fragment>
        <Typography align="center" variant="h5" color="inherit" className="rater heading">
          {
            this.props.type === "movies" ?
              "Bitte bewerte diesen Film"
              : "Bitte bewerte diese Serie"
          }
        </Typography>
        {movieItem}
        <br/>
        <Button
          id="btnNoVote"
          variant="contained"
          color="secondary"
          className="rater btn-no-vote"
          onClick={this.handleNoVote}>
          Überspringen
        </Button>
      </React.Fragment>
    );
  }
}

Rater.propTypes = {
  type: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
};

export default observer(Rater);