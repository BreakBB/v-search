import React from 'react';
import {withRouter} from 'react-router-dom';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import RatingIcon from '@material-ui/icons/ThumbsUpDown';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";

class MenuDrawer extends React.Component {
  state = {
    open: false
  };

  render() {
    const sideList = (
      <List>
        <ListItem button key={'home'} onClick={() => this.props.history.push("/")}>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary={'Startseite'}/>
        </ListItem>
        <ListItem button key={'rating'} onClick={() => this.props.history.push("/rating")}>
          <ListItemIcon>
            <RatingIcon/>
          </ListItemIcon>
          <ListItemText primary={'Bewerten'}/>
        </ListItem>
      </List>
    );

    return (
      <React.Fragment>
        <IconButton
          className="menu-button"
          color="inherit"
          aria-label="Menu"
          onClick={() => this.setState({open: true})}>
          <MenuIcon/>
        </IconButton>
        <Drawer open={this.state.open} onClose={() => this.setState({open: false})}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({open: false})}
            onKeyDown={() => this.setState({open: false})}
          >
            {sideList}
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withRouter(MenuDrawer);