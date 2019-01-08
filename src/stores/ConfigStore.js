import {action, decorate, observable} from "mobx";
import langStore from "./LangStore";
import {API_COM_GENRES, API_COM_MOVIES, API_DE_GENRES, API_DE_MOVIES} from "../app-config";

class ConfigStore {
  isMobile = false;
  API_MOVIES = "";
  API_GENRES = "";

  constructor() {
    this.isMobile = window.innerWidth <= 600;

    if (langStore.language === langStore.DE) {
      this.API_MOVIES = API_DE_MOVIES;
      this.API_GENRES = API_DE_GENRES;
    }
    else {
      this.API_MOVIES = API_COM_MOVIES;
      this.API_GENRES = API_COM_GENRES;
    }
  }

  setMobile(newVal) {
    this.isMobile = newVal
  }

  update() {
    if (langStore.language === langStore.DE) {
      this.API_MOVIES = API_DE_MOVIES;
      this.API_GENRES = API_DE_GENRES;
    }
    else {
      this.API_MOVIES = API_COM_MOVIES;
      this.API_GENRES = API_COM_GENRES;
    }
  }
}

decorate(ConfigStore, {
  isMobile: observable,
  API_MOVIES: observable,
  API_GENRES: observable,
  setMobile: action,
  update: action
});

const configStore = new ConfigStore();
export default configStore;