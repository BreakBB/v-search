import {action, decorate, observable} from 'mobx';

class AuthStore {
  isLoggedIn = false;
  userId = null;
  inactiveTimer = 60000; // Timeout after 10 minutes
  timeoutId = 0;

  constructor() {
    const login = window.localStorage.getItem('login_token');

    if (login != null) {
      const data = JSON.parse(login);
      // Login should expire after 10 minutes
      if (Date.now() - data.timestamp < 60000) {
        this.isLoggedIn = true;
        this.userId = data.userId;
        this.refreshTokenTime();
        this.addListener();
      }
      else {
        this.removeToken();
        this.removeListener();
      }
    }
  }

  login = (userId) => {
    this.isLoggedIn = true;
    this.userId = userId;
    this.refreshTokenTime();
    this.addListener();
  };

  // Add different listeners to check for inactivity of the user
  addListener = () => {
    document.addEventListener("mousemove", this.resetTimer, false);
    document.addEventListener("mousedown", this.resetTimer, false);
    document.addEventListener("keypress", this.resetTimer, false);
    document.addEventListener("touchmove", this.resetTimer, false);

    this.timeoutId = window.setTimeout(this.logout, this.inactiveTimer);
  };

  logout = () => {
    this.isLoggedIn = false;
    this.removeToken();
    this.removeListener();
  };

  // Remove the listeners since we just need to check logged in users
  removeListener = () => {
    document.removeEventListener("mousemove", this.resetTimer, false);
    document.removeEventListener("mousedown", this.resetTimer, false);
    document.removeEventListener("keypress", this.resetTimer, false);
    document.removeEventListener("touchmove", this.resetTimer, false);

    window.clearTimeout(this.timeoutId);
  };

  refreshTokenTime = () => {
    window.localStorage.setItem('login_token', JSON.stringify({
      "timestamp": Date.now(),
      "userId": this.userId
    }));
  };

  removeToken = () => {
    window.localStorage.removeItem('login_token');
  };

  resetTimer = () => {
    this.inactiveTimer = 60000;
  };
}

decorate(AuthStore, {
  isLoggedIn: observable,
  userId: observable,
  login: action,
  logout: action
});

const authStore = new AuthStore();
export default authStore;