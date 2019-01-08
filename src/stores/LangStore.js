import {action, decorate, observable} from "mobx";

class LangStore {
  language = "";
  DE = "DE";
  COM = "COM";

  constructor() {
    if (window.navigator.language === "de") {
      this.language = this.DE;
    }
    else {
      this.language = this.COM;
    }
  }

  setLanguage(newVal) {
    this.language = newVal;
  }
}

decorate(LangStore, {
  language: observable,
  setLanguage: action
});

const langStore = new LangStore();
export default langStore;