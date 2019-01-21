import {action, decorate, observable} from 'mobx';

class AuthStore {
  isLoggedIn = false;
  userId = null;

  constructor() {
    const login = window.localStorage.getItem('login_token');

    if (login != null) {
      const data = JSON.parse(login);
      console.log("login_token:", data);
      // Login should expire after 10 minutes
      if (Date.now() - data.timestamp < 60000) {
        this.isLoggedIn = true;
        this.userId = data.userId;
        this.refreshTokenTime();
      }
      else {
        this.removeToken();
      }
    }
  }

  login(userId) {
    this.isLoggedIn = true;
    this.userId = userId;
    this.refreshTokenTime();
  }

  logout() {
    this.isLoggedIn = false;
    this.removeToken();
  }

  refreshTokenTime() {
    window.localStorage.setItem('login_token', JSON.stringify({
      "timestamp": Date.now(),
      "userId": this.userId
    }));
  }

  removeToken() {
    window.localStorage.removeItem('login_token');
  }
}

decorate(AuthStore, {
  isLoggedIn: observable,
  userId: observable,
  login: action,
  logout: action
});

const authStore = new AuthStore();
export default authStore;