import React from 'react';
import {configStore} from '../../stores';
import {observer} from 'mobx-react';
import {Paper} from "@material-ui/core/es/index";
import './RatingPage.css';

class RatingPage extends React.Component {

  static handleWindowResize() {
    configStore.setMobile(window.innerWidth <= 600)
  }

  componentWillMount() {
    window.addEventListener('resize', RatingPage.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', RatingPage.handleWindowResize);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Paper className="Rating-Page">
      </Paper>
    );
  }
}

export default observer(RatingPage);