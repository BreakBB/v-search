import React from 'react';
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './GenreItem.css'

class GenreItem extends React.Component {
  state = {
    selected: false
  };

  handleChange = () => {
    this.setState({
      selected: !this.state.selected
    });
    this.props.handleSelection(this.props.title);
  };

  render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.selected}
            onChange={this.handleChange}
            color="primary"
          />
        }
        label={this.props.title}
        className="genre-item"
      />
    )
  }
}

GenreItem.propTypes = {
  title: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired
};

export default GenreItem;