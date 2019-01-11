import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, TextField} from "@material-ui/core/es/index";
import './FilterButton.css'

class FilterButton extends React.Component {

  state = {
    selection: ''
  };

  handleChange = event => {
    let value = event.target.value;

    if (this.props.number && value === "") {
      value = 0;
    }

    this.setState({
      selection: value
    });
    this.props.dataStoreAction(value);
  };

  render() {
    let menuItems = null;

    if (!this.props.number) {
      menuItems = [];
      menuItems.push(
        <MenuItem key="none" value={null}>
          -Auswahl-
        </MenuItem>
      );
      menuItems.push(
        this.props.children.map(name => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))
      );
    }

    return (
      <TextField
        select={!this.props.number}
        type={this.props.number ? "number" : "select"}
        className="filter-button"
        label={this.props.title}
        value={this.state.selection}
        onChange={this.handleChange}
      >
        {menuItems}
      </TextField>
    );
  }
}

FilterButton.propTypes = {
  title: PropTypes.string.isRequired,
  dataStoreAction: PropTypes.func.isRequired,
  children: PropTypes.array,
  number: PropTypes.bool
};

export default FilterButton;