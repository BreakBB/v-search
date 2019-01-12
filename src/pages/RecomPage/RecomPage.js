import React from 'react';
import authStore from '../../stores/AuthStore';
import configStore from '../../stores/ConfigStore'
import {observer} from 'mobx-react';
import {Paper} from "@material-ui/core/es/index";
import Typography from "@material-ui/core/es/Typography/Typography";
import './RecomPage.css';
import ResultTable from "../../components/ResultTable/ResultTable";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class RecomPage extends React.Component {

  state = {
    movies: [],
    showProgressbar: false,
    fetching: false
  };

  static handleWindowResize() {
    configStore.setMobile(window.innerWidth <= 600)
  }

  componentWillMount() {
    window.addEventListener('resize', RecomPage.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', RecomPage.handleWindowResize);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (authStore.isLoggedIn && !this.state.fetching) {
      this.fetchRecommendations().then((movies) => {
        console.log("Fetched recommendations: ", movies);

        this.setState({
          movies: movies,
          showProgressbar: false
        });
      });
    }
  }

  async fetchRecommendations() {
    this.setState({
      showProgressbar: true,
      fetching: true
    });

    const response = await fetch(configStore.API_RECOM, {
      'method': 'get',
      'headers': {
        'User-Id': authStore.userId
      }
    });
    return await response.json();
  }

  render() {
    if (!authStore.isLoggedIn) {
      return (
        <Typography align="center" variant="h6" color="inherit">
          Für diese Funktion müssen Sie eingeloggt sein. Bitte nutzen Sie dafür den Knopf oben rechts.
        </Typography>
      );
    }

    if (this.state.showProgressbar) {
      return (
        <CircularProgress size={100}/>
      );
    }

    return (
      <Paper className="Rating-Page">
        <Typography align="center" variant="h5" color="inherit" className="rating-heading">
          Diese Filme und Serien könnten Ihnen gefallen
        </Typography>
        <ResultTable data={this.state.movies}/>
      </Paper>
    );
  }
}

export default observer(RecomPage);