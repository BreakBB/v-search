import React from "react";
import PropTypes from 'prop-types'
import configStore from "../../stores/ConfigStore";
import authStore from "../../stores/AuthStore";
import Button from "@material-ui/core/es/Button/Button";
import ThumpUpIcon from '@material-ui/icons/ThumbUp';
import ThumpDownIcon from '@material-ui/icons/ThumbDown';

class VoteButton extends React.Component {

  // The controller is used to abort any fetch calls
  // Whenever a fetch/Promise isn't resolved yet and the component unmounts, it might lead to memory leaks
  controller = new AbortController();

  componentWillUnmount() {
    this.controller.abort();
  }

  handleVote = async () => {
    const voteAddress = (this.props.upVote ? 'vote-up/' : 'vote-down/');

    const response = await fetch(
      configStore.API_MOVIES + voteAddress, {
        'signal': this.controller.signal,
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'userId': authStore.userId,
          'movieId': this.props.movieId
        })
      });

    if (response.status === 200) {
      this.props.onVote();
    }
  };

  render() {
    return (
      <Button
        id={this.props.movieId}
        disabled={!authStore.isLoggedIn}
        variant="contained"
        color="secondary"
        onClick={() => this.handleVote()}
      >
        {
          this.props.upVote ? <ThumpUpIcon/> : <ThumpDownIcon/>
        }
      </Button>
    );
  }
}

VoteButton.propTypes = {
  upVote: PropTypes.bool.isRequired,
  movieId: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired
};

export default VoteButton;