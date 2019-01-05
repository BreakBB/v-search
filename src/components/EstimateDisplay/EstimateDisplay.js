import React from 'react';
import PropTypes from 'prop-types';
import {API_DE_MOVIES} from "../../app-config";
import Typography from "@material-ui/core/es/Typography/Typography";

class EstimateDisplay extends React.Component {

  state = {
    estimate: 0
  };

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

  render() {
    return (
      <Typography variant="h6">{this.props.label} Sie {this.state.estimate} Filme und Serien</Typography>
    );
  }
}

EstimateDisplay.propTypes = {
  label: PropTypes.string.isRequired
};

export default EstimateDisplay;