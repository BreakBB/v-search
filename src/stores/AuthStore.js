import {action, decorate, observable} from 'mobx';

class AuthStore {
  isLoggedIn = false;
  userId = null;

  login(userId) {
    this.isLoggedIn = true;
    this.userId = userId;
  }

  logout() {
    this.isLoggedIn = false
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