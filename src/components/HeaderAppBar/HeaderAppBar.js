import React from 'react';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginButton from "../LoginButton/LoginButton";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import './HeaderAppBar.css'

class HeaderAppBar extends React.Component {
  render() {
    return (
      <AppBar className="Header-App-Bar" position="static">
        <Toolbar>
          <MenuDrawer/>
          <Typography variant="h6" color="inherit" className="grow">
            {this.props.title}
          </Typography>
          <LoginButton/>
        </Toolbar>
      </AppBar>
    );
  }
}

HeaderAppBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default HeaderAppBar;