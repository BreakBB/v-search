import {observable, decorate, action} from 'mobx';

export const authenticationStore = observable({
  userLevel: 0,
  token: "",
  setUserLevel: action((newVal) => authenticationStore.userLevel = newVal),
  setToken: action((newVal) => authenticationStore.setToken = newVal),
});

export const configStore = observable({
  isMobile: window.innerWidth <= 600,
  setMobile: action((newVal) => configStore.isMobile = newVal)
});

class DataStore {
  title = null;
  rating = null;
  imdb = null;
  year = null;
  genres = null;
  fsk = null;

  setTitle(title) {
    this.title = title;
  }

  setRating(rating) {
    this.rating = rating;
  }

  setIMDb(imdb) {
    this.imdb = imdb;
  }

  setYear(year) {
    this.year = year;
  }

  setGenres(genres) {
    this.genres = genres;
  }

  setFSK(fsk) {
    this.fsk = fsk;
  }
}

decorate(DataStore, {
  title: observable,
  rating: observable,
  imdb: observable,
  year: observable,
  genres: observable,
  fsk: observable,
  setTitle: action,
  setRating: action,
  setIMDb: action,
  setYear: action,
  setGenres: action,
  setFSK: action,
});

export const dataStore = new DataStore();