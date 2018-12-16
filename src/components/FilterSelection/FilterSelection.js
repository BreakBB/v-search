import React from 'react';
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Toolbar,
  Typography
} from "@material-ui/core/es/index";
import './FilterSelection.css'

class FilterSelection extends React.Component {

  render() {
    const typoComp = (
      <Typography variant="h5" color="inherit" id="filterTitle">
        Filter
      </Typography>
    );

    if (this.props.isMobile) {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            {typoComp}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="filter-wrapper">
              {this.props.children}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }

    return (
      <React.Fragment>
        <Toolbar className="filter-wrapper">
          {typoComp}
        </Toolbar>
        <div className="filter-wrapper">
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

FilterSelection.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default FilterSelection;