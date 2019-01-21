import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/es/Typography/Typography";

class MovieDetails extends React.PureComponent {

  render() {
    const movie = this.props.movie;

    let maturity_rating = "-";
    if (movie.maturity_rating != null) {
      maturity_rating = movie.maturity_rating.replace(/\(.*\)/, '');
    }

    return (
      <div className="random-page details">
        <Typography className="random-page inline half" align="left" variant="h6"
                    color="inherit">Bewertung:</Typography>
        <Typography className="random-page inline half" align="right" variant="h6"
                    color="inherit">{movie.star_rating}</Typography>

        <Typography className="random-page inline half" align="left" variant="h6"
                    color="inherit">IMDb:</Typography>
        <Typography className="random-page inline half" align="right" variant="h6"
                    color="inherit">{movie.imdb_rating}</Typography>

        <Typography className="random-page inline half" align="left" variant="h6"
                    color="inherit">Jahr:</Typography>
        <Typography className="random-page inline half" align="right" variant="h6"
                    color="inherit">{movie.year}</Typography>

        <Typography className="random-page inline half" align="left" variant="h6"
                    color="inherit">FSK:</Typography>
        <Typography className="random-page inline half" align="right" variant="h6"
                    color="inherit">{maturity_rating}</Typography>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieDetails;