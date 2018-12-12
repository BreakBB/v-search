import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, TextField} from "@material-ui/core/es/index";
import './FilterButton.css'

class FilterButton extends React.Component {

  state = {
    selection: ''
  };

  handleChange = event => {
    this.setState({
      selection: event.target.value
    });
    this.props.dataStoreAction(event.target.value);
  };

  render() {
    return (
      <TextField
        select
        className="filter-button"
        label={this.props.title}
        value={this.state.selection}
        onChange={this.handleChange}
      >
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
  multiple: PropTypes.bool,
  dataStoreAction: PropTypes.func.isRequired
};

export default FilterButton;