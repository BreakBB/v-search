import React from 'react';
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './GenreItem.css'
import Radio from "@material-ui/core/es/Radio/Radio";

class GenreItem extends React.Component {
  state = {
    selected: false
  };

  handleChange = () => {
    this.setState({
      selected: !this.state.selected
    });
    this.props.handleSelection(this.props.label);
  };

  render() {
    const {radioButton, ...labelProps} = this.props;

    if (radioButton) {
      return (
        <FormControlLabel
          value={this.props.value}
          label={this.props.label}
          control={
            <Radio/>
          }
          className="genre-item"
          {...labelProps}
        />
      );
    }

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.props.selected}
            onChange={this.handleChange}
            color="primary"
          />
        }
        label={this.props.label}
        className="genre-item"
      />
    );
  }
}

GenreItem.propTypes = {
  label: PropTypes.string.isRequired,
  handleSelection: PropTypes.func,
  radioButton: PropTypes.bool,
  selected: PropTypes.bool
};

export default GenreItem;