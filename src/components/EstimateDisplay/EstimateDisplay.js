import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/es/Typography/Typography";

class EstimateDisplay extends React.Component {

  state = {
    estimate: 0
  };

  componentDidMount() {
    this.fetchMovieEstimate().then((estimate) => {
      this.setState({
        estimate: estimate
      });
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.moviesURL !== prevProps.moviesURL) {
      this.fetchMovieEstimate().then((estimate) => {
        this.setState({
          estimate: estimate
        });
      });
    }
  }

  async fetchMovieEstimate() {
    const response = await fetch(this.props.moviesURL + 'estimate');
    return await response.json();
  }

  render() {
    return (
      <Typography variant="h6">{this.props.label} Sie {this.state.estimate} Filme und Serien</Typography>
    );
  }
}

EstimateDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  moviesURL: PropTypes.string.isRequired
};

export default EstimateDisplay;