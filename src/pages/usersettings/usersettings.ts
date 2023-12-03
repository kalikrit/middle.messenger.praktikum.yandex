import Block from '../../utils/Block';
import UserController from '../../controller/UserController';
import connect from '../../utils/Connect';
import { Indexed, User } from '../../types/types';
import template from './usettings.hbs?raw';

const uctl = new UserController();

class UserSettings extends Block {
  constructor(props:Record<string, any>) {
    super({
      componentName: 'Profile',
      onLogout: () => {
        this.onLogout.apply(this);
      },
      onSettings: () => {
        this.onSettings.apply(this);
      },

      onChangePassword: () => {
        this.onChangePassword.apply(this);
      },
      ...props,
    });
  }

  onLogout() {
    uctl.logout();
  }

  onSettings() {
    this.router.go('settings');
  }

  onChangePassword() {
    this.router.go('password');
  }

  render() {
    return template;
  }
}

const mapUserToProps = (state: Indexed): User => ({
  first_name: state.user?.first_name,
  second_name: state.user?.second_name,
  display_name: state.user?.display_name,
  login: state.user?.login,
  email: state.user?.email,
  phone: state.user?.phone,
  avatar: state.user?.avatar,
  id: state.user?.id,
});
export default connect(mapUserToProps)(UserSettings);
