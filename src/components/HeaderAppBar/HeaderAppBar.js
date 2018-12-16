import React from 'react';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './HeaderAppBar.css'

//TODO: Add functions for login and menu

class HeaderAppBar extends React.Component {
  render() {
    return (
      <AppBar className="Header-App-Bar" position="static">
        <Toolbar>
          <IconButton className="menu-button" color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" color="inherit" className="grow">
            {this.props.title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

HeaderAppBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default HeaderAppBar;