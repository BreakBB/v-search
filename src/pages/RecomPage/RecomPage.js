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
    fetched: false,
    showProgressbar: false
  };

  // The controller is used to abort any fetch calls
  // Whenever a fetch/Promise isn't resolved yet and the component unmounts, it might lead to memory leaks
  controller = new AbortController();

  static handleWindowResize() {
    configStore.setMobile(window.innerWidth <= 600)
  }

  componentWillMount() {
    window.addEventListener('resize', RecomPage.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', RecomPage.handleWindowResize);
    this.controller.abort();
  }

  componentDidMount() {
    if (authStore.isLoggedIn && !this.state.fetched) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (authStore.isLoggedIn && !this.state.fetched) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const movies = await this.fetchRecommendations();
    console.log("Fetched recommendations: ", movies);

    this.setState({
      movies: movies,
      showProgressbar: false
    });
  };

  async fetchRecommendations() {
    this.setState({
      fetched: true,
      showProgressbar: true
    });
    console.log("Fetching recommendations...");

    const response = await fetch(configStore.API_RECOM_BAYES, {
      'signal': this.controller.signal,
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