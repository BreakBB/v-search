import React from 'react';
import authStore from '../../stores/AuthStore';
import configStore from '../../stores/ConfigStore'
import {observer} from 'mobx-react';
import {Paper} from "@material-ui/core/es/index";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/es/Radio/Radio";
import './RatingPage.css';
import '../general.css';
import {EstimateDisplay, GenreSelection, Rater} from "../../components";

class RatingPage extends React.Component {

  state = {
    type: "movie",
    selection: null
  };

  static handleWindowResize() {
    configStore.setMobile(window.innerWidth <= 600)
  }

  componentWillMount() {
    window.addEventListener('resize', RatingPage.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', RatingPage.handleWindowResize);
  }

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value
    });
  };

  handleGenreChange = (selection) => {
    this.setState({
      selection: selection
    });
  };

  render() {

    if (!authStore.isLoggedIn) {
      return (
        <Typography align="center" variant="h6" color="inherit">
          Für diese Funktion müssen Sie eingeloggt sein. Bitte nutzen Sie dafür den Knopf oben rechts.
        </Typography>
      );
    }

    return (
      <Paper className="paper-page">
        <Typography align="center" variant="h5" color="inherit" className="rating-page heading">
          Bewerten
        </Typography>
        <EstimateDisplay label="Bewerten" moviesURL={configStore.API_MOVIES}/>
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="typeSelection"
            value={this.state.type}
            onChange={this.handleTypeChange}
          >
            <FormControlLabel value="movie" control={<Radio/>} label="Filme"/>
            <FormControlLabel value="series" control={<Radio/>} label="Serien"/>
          </RadioGroup>
        </FormControl>
        <GenreSelection radioGroup onChange={this.handleGenreChange} genresURL={configStore.API_GENRES}/>
        {
          this.state.selection ?
            <Rater type={this.state.type} genre={this.state.selection}/>
            : null
        }
      </Paper>
    );
  }
}

export default observer(RatingPage);