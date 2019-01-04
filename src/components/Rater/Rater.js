import React from 'react';
import PropTypes from 'prop-types'
import Button from "@material-ui/core/es/Button/Button";
import ThumpUpIcon from '@material-ui/icons/ThumbUp';
import ThumpDownIcon from '@material-ui/icons/ThumbDown';
import Typography from "@material-ui/core/es/Typography/Typography";
import './Rater.css'
import {API_DE_GENRES, API_DE_MOVIES} from "../../app-config";
import {arrayBufferToBase64, getRandomElement} from "../../utilities";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import {authStore} from "../../stores";

class Rater extends React.Component {

  state = {
    genre_numbers: [],
    randomMovie: null,
    error_combination: false
  };

  componentDidMount() {
    // Here .then is used instead of async/await since "componentDidMount" is not an async method
    this.fetchGenreNumbers().then(() => {
      this.getRandomEntry();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Only update if the genre changed
    if (prevProps.genre !== this.props.genre || prevProps.type !== this.props.type) {
      // Here .then is used instead of async/await since "componentDidUpdate" is not an async method
      this.fetchGenreNumbers().then(() => {
        this.getRandomEntry();
      });

    }
  }

  async getRandomEntry() {
    const genre_numbers = this.state.genre_numbers;
    if (genre_numbers.length === 0) {
      this.setState({
        error_combination: true
      });
      return;
    }

    const randomNumber = getRandomElement(genre_numbers);

    const response = await fetch(API_DE_MOVIES + randomNumber);
    const randomMovie = await response.json();

    this.setState({
      randomMovie: randomMovie,
      error_combination: false
    })
  }

  async fetchGenreNumbers() {
    const response = await fetch(API_DE_GENRES + this.props.genre + '/numbers/' + this.props.type);
    const genreNumbers = await response.json();

    this.setState({
      genre_numbers: genreNumbers
    });
  }

  handleVote = async (voteUp) => {
    const voteAddress = (voteUp ? '/vote-up/' : '/vote-down/');

    const response = await fetch(
      API_DE_MOVIES + this.state.randomMovie.movie_id + voteAddress, {
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({'userId': authStore.userId})
      });

    console.log(response.statusText);

    if (response.status === 200) {
      this.getRandomEntry();
    }
  };

  handleNoVote = () => {
    this.getRandomEntry();
  };

  render() {
    let movieItem = null;

    if (this.state.error_combination) {
      movieItem = (
        <div className="movie-item">
          <Typography align="center" variant="h6" color="inherit">
            {
              this.props.type === "movies" ?
                "Keinen Film zu dem Genre \"" + this.props.genre + "\" gefunden."
                : "Keine Serie zu dem Genre \"" + this.props.genre + "\" gefunden."
            }
          </Typography>
        </div>
      );
    }
    else if (this.state.randomMovie) {
      movieItem = (
        <div className="movie-item" onClick={() => window.open(this.state.randomMovie.url, "_blank")}>
          <Typography align="center" variant="h6" color="inherit">
            {
              this.state.randomMovie.title
            }
          </Typography>
          <img className="movie-poster"
               src={'data:image/jpeg;base64,' + arrayBufferToBase64(this.state.randomMovie.poster.data)} alt="None"
          />
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
        <Typography align="center" variant="h5" color="inherit" className="rater-heading">
          {
            this.props.type === "movies" ?
              "Bitte bewerte diesen Film"
              : "Bitte bewerte diese Serie"
          }
        </Typography>
        <div className="rater-wrapper">
          <Button
            id="btnVoteUp"
            variant="contained"
            color="secondary"
            onClick={() => this.handleVote(true)}
          >
            <ThumpUpIcon/>
          </Button>
          {movieItem}
          <Button
            id="btnVoteDown"
            variant="contained"
            color="secondary"
            onClick={() => this.handleVote(false)}
          >
            <ThumpDownIcon/>
          </Button>
        </div>
        <br/>
        <Button
          id="btnNoVote"
          variant="contained"
          color="secondary"
          className="btn-no-vote"
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

export default Rater;