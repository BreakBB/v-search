import React from 'react';
import PropTypes from 'prop-types'
import Button from "@material-ui/core/es/Button/Button";
import ThumpUpIcon from '@material-ui/icons/ThumbUp';
import ThumpDownIcon from '@material-ui/icons/ThumbDown';
import Typography from "@material-ui/core/es/Typography/Typography";
import './Rater.css'
import {BACKEND_ADDRESS} from "../../app-config";
import {arrayBufferToBase64, getRandomElement} from "../../utilities";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class Rater extends React.Component {

  state = {
    genre_numbers: 0,
    randomMovie: null
  };

  componentDidMount() {
    // Here .then is used instead of async/await since "componentDidMount" is not an async method
    this.fetchGenreNumbers().then(() => {
      this.getRandomEntry();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Only update if the genre changed
    if (prevProps.genre !== this.props.genre) {
      // Here .then is used instead of async/await since "componentDidUpdate" is not an async method
      this.fetchGenreNumbers().then(() => {
        this.getRandomEntry();
      });

    }
  }

  async getRandomEntry() {
    const genre_numbers = this.state.genre_numbers;
    const randomNumber = getRandomElement(genre_numbers);

    const result = await fetch(BACKEND_ADDRESS + '/api/de/movies/' + randomNumber);
    const randomMovie = await result.json();

    this.setState({
      randomMovie: randomMovie
    })
  }

  async fetchGenreNumbers() {
    const result = await fetch(BACKEND_ADDRESS + '/api/de/genres/' + this.props.genre + '/numbers');
    const genreNumbers = await result.json();

    this.setState({
      genre_numbers: genreNumbers
    });
  }

  handleUpVote = () => {

  };

  handleDownVote = () => {

  };

  handleNoVote = () => {
    this.getRandomEntry();
  };

  render() {
    let movieItem = null;

    if (this.state.randomMovie) {
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
            onClick={this.handleUpVote}
          >
            <ThumpUpIcon/>
          </Button>
          {movieItem}
          <Button
            id="btnVoteDown"
            variant="contained"
            color="secondary"
            onClick={this.handleDownVote}
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