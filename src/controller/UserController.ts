import ApiUser from '../services/user';
import store from '../utils/Store';

/**
 * юзер контроллер
 */

// вспомогательная утилита установки в LS
const auth = () => {
  store.set('auth', true);
  window.localStorage.setItem('auth', 'true');
};

// вспомогательная утилита установки в LS
const logout = () => {
  store.set('auth', false);
  window.localStorage.removeItem('auth');
};

class UserController {
  private api: ApiUser;

  constructor() {
    this.api = new ApiUser();
  }

  // authorization
  public authUser(formObject: Record<string, any>) {
    this.api.login(formObject)
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          auth();
        }
        if (data.status === 400) {
          const response = data && data.status ? JSON.parse(data.response) : null;
          if (response.reason === 'User already in system') {
            auth();
          }
        }
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(`auth user error: ${error}`);
      });
  }

  // logout
  public logout() {
    this.api.logout()
      .then(() => {
        logout();
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(`logout error: ${error}`);
      });
  }

  // registration
  public signUp(formObject: Record<string, any>) {
    this.api.signup(formObject)
      .then((data: Record<string, any>) => {
        if (data.status !== 200) {
          /* eslint no-console: 0 */
          console.error('registration error');
        }
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(`error: ${error}`);
      });
  }

  // get user info
  public getUser() {
    this.api.user()
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          const chats = JSON.parse(data.response);
          store.set('user', chats);
        } else {
          logout();
        }
        return true;
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(`error: ${error}`);
      });
  }

  // edit user info
  public profile(data: Record<string, any>) {
    return this.api.profile(data)
      .then(() => {
        this.getUser();
        return true;
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(`edit user profile error: ${error}`);
      });
  }

  // edit user password
  public password(data: Record<string, any>) {
    return this.api.password(data)
      .then(() => {
        this.getUser();
        return true;
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(`edit password error: ${error}`);
      });
  }

  // set user avatar
  public avatar(data: Record<string, any>) {
    this.api.avatar(data)
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(`set user avatar error: ${error}`);
      });
  }
}

export default UserController;
