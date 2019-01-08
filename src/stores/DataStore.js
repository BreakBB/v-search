import {action, decorate, observable} from "mobx";

class DataStore {
  title = null;
  star_rating = null;
  imdb_rating = null;
  year = null;
  genres = null;
  maturity_rating = null;
  movies = true;
  series = true;

  setTitle(title) {
    this.title = title;
  }

  setStarRating(rating) {
    this.star_rating = rating;
  }

  setIMDbRating(imdb) {
    this.imdb_rating = imdb;
  }

  setYear(year) {
    this.year = year;
  }

  setGenres(genres) {
    this.genres = genres;
  }

  setMaturityRating(fsk) {
    this.maturity_rating = fsk;
  }

  setMovies(movies) {
    this.movies = movies;
  }

  setSeries(series) {
    this.series = series;
  }
}

decorate(DataStore, {
  title: observable,
  rating: observable,
  imdb: observable,
  year: observable,
  genres: observable,
  fsk: observable,
  movies: observable,
  series: observable,
  setTitle: action,
  setRating: action,
  setIMDb: action,
  setYear: action,
  setGenres: action,
  setFSK: action,
  setMovies: action,
  setSeries: action,
});

const dataStore = new DataStore();
export default dataStore;