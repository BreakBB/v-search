import {action, decorate, observable} from "mobx";
import langStore from "./LangStore";
import {API_COM, API_COM_GENRES, API_COM_MOVIES, API_DE, API_DE_GENRES, API_DE_MOVIES} from "../app-config";

class ConfigStore {
  isMobile = false;
  API_MOVIES = "";
  API_GENRES = "";
  API_RECOM_BAYES = "";
  API_RECOM_NN = "";

  constructor() {
    this.isMobile = window.innerWidth <= 600;

    if (langStore.language === langStore.DE) {
      this.API_MOVIES = API_DE_MOVIES;
      this.API_GENRES = API_DE_GENRES;
      this.API_RECOM_BAYES = API_DE + "recom/bayes";
      this.API_RECOM_NN = API_DE + "recom/nn";
    }
    else {
      this.API_MOVIES = API_COM_MOVIES;
      this.API_GENRES = API_COM_GENRES;
      this.API_RECOM_BAYES = API_COM + "recom/bayes";
      this.API_RECOM_NN = API_COM + "recom/nn";
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
  API_RECOM: observable,
  setMobile: action,
  update: action
});

const configStore = new ConfigStore();
export default configStore;