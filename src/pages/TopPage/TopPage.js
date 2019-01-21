import React from 'react';
import authStore from '../../stores/AuthStore';
import configStore from '../../stores/ConfigStore'
import {observer} from 'mobx-react';
import {Paper} from "@material-ui/core/es/index";
import Typography from "@material-ui/core/es/Typography/Typography";
import '../general.css';
import ResultTable from "../../components/ResultTable/ResultTable";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import {processMovieArray} from "../../utilities";

class TopPage extends React.Component {

  state = {
    movies: [],
    fetched: false,
    showProgressbar: false
  };

  // The controller is used to abort any fetch calls
  // Whenever a fetch/Promise isn't resolved yet and the component unmounts, it might lead to memory leaks
  controller = new AbortController();

  static handleWindowResize = () => {
    configStore.setMobile(window.innerWidth <= 600)
  };

  componentWillMount() {
    window.addEventListener('resize', TopPage.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', TopPage.handleWindowResize);
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
    const recom = await this.fetchRecommendations();
    console.log("Fetched recommendations: ", recom);

    recom.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      else if (a.value > b.value) {
        return -1;
      }
      return 0;
    });

    // We only want to show the top 20 recommendations
    const movies = recom.slice(0, 20);

    const movieList = await this.fetchMovieList(movies);

    this.setState({
      movies: processMovieArray(movieList),
      showProgressbar: false
    });
  };

  fetchRecommendations = async () => {
    this.setState({
      fetched: true,
      showProgressbar: true
    });
    console.log("Fetching recommendations...");

    const response = await fetch(configStore.API_RECOM_NN, {
      'signal': this.controller.signal,
      'method': 'get',
      'headers': {
        'User-Id': authStore.userId
      }
    });
    return await response.json();
  };

  fetchMovieList = async (recomList) => {

    let movieList = [];

    for (const movie of recomList) {
      const response = await fetch(configStore.API_MOVIES + movie.id, {"signal": this.controller.signal});
      movieList.push(await response.json())
    }

    return movieList;
  };

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
      <Paper className="paper-page">
        <Typography align="center" variant="h5" color="inherit" className="rating-heading">
          Hier sind Ihre Top 20 Empfehlungen
        </Typography>
        <ResultTable data={this.state.movies}/>
      </Paper>
    );
  }
}

export default observer(TopPage);