import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, TextField} from "@material-ui/core/es/index";
import './FilterButton.css'

class FilterButton extends React.Component {

  state = {
    selection: '',
    error: false
  };

  handleChange = event => {
    const value = event.target.value;
    let error = false;

    if (this.props.number && value === "") {
      error = true;
    }

    this.setState({
      selection: value,
      error: error
    });
    this.props.dataStoreAction(value);
  };

  render() {
    return (
      <TextField
        select={!this.props.number}
        error={this.state.error}
        type={this.props.number ? "number" : "select"}
        className="filter-button"
        label={this.props.title}
        value={this.state.selection}
        onChange={this.handleChange}
      >
        <MenuItem key="none" value={null}>
          -Auswahl-
        </MenuItem>
        {this.props.children.map(name => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

FilterButton.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.bool,
  dataStoreAction: PropTypes.func.isRequired
};

export default FilterButton;