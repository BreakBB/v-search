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

    this.setState({
      selection: value
    });
    this.props.dataStoreAction(value);
  };

  render() {
    let menuItems = null;

    if (this.props.type === "select") {
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
        select={this.props.type === "select"}
        type={this.props.type === "select" ? "select" : "number"}
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
  type: PropTypes.oneOf(["number", "date", "select"])
};

export default FilterButton;