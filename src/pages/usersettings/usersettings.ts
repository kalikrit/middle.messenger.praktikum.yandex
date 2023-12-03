import Block from '../../utils/Block';
import UserController from '../../controller/UserController';
import connect from '../../utils/Connect';
import { Indexed, User } from '../../types/types';
import validateForm from '../../utils/Validation';

const uctl = new UserController();

class UserSettings extends Block {
  constructor(props:Record<string, any>) {
    super({
      componentName: 'Profile',
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
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

  validateField(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;
    const { name, value } = target;
    const input = { [name]: value };
    const errorField: Record<string, any> | boolean = validateForm(input);
    const { props } = this;
    const { error } = props.state;
    const updateError = { ...error, [name]: errorField[name] };
    this.setProps({
      ...input,
      error: updateError,
    });
  }

  init():boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
    };
    return true;
  }

  validateForm(formObject: object) {
    const error = validateForm(formObject);
    this.setProps({ ...formObject, error });

    return Object.keys(error).length === 0;
  }

  async onSubmit(event: Record<string, any>) {
    event.preventDefault();
    event.stopPropagation();
    const { target } = event;
    const validate = this.validateForm(target);

    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());

    if (validate) {
      await uctl.profile(formObject);
    }

    return true;
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
    const { props } = this;
    const { error } = props.state;

    return (`
    <div class="window">
    <form>
        <div class="usersettings">
            <div>
                <input type="file"  accept="image/*" name="avatar" id="file" style="display: none;">              
                <div class="avatar"></div>
            </div>
            <div>Ваше имя</div>
            <div>
                <div class="row">
                <div>Почта</div>
        {{{ Field
            id="email"
            name="email"
            type="email"
            placeholder="Почта"
            value=state.email
            onBlur=onBlur
            error="${error?.email || ''}"
        }}}
                </div>
                <div class="row">
                <div>Логин</div>
        {{{ Field
            id="login"
            name="login"
            type="text"
            placeholder="Ваш логин"
            value=state.login
            onBlur=onBlur
            error="${error?.login || ''}"
        }}}
                </div>
                <div class="row">
                <div>Имя</div>
        {{{ Field
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Имя"
            value=state.first_name
            onBlur=onBlur
            error="${error?.first_name || ''}"
        }}}
                </div>
                <div class="row">
                <div>Фамилия</div>
        {{{ Field
            id="second_name"
            name="second_name"
            type="text"
            placeholder="Фамилия"
            value=state.second_name
            onBlur=onBlur
            error="${error?.second_name || ''}"
        }}}
                </div>
                <div class="row">
                <div>Имя в чате</div>
        {{{ Field
            id="display_name"
            name="display_name"
            type="text"
            placeholder="Ваш ник в чате"
            toggle=true value=state.display_name
            onBlur=onBlur
            error="${error?.display_name || ''}"
        }}}
                </div>
                <div class="row">
                <div>Телефон</div>
        {{{ Field
            id="phone"
            name="phone"
            type="phone"
            placeholder="+7 (111) 222 33 44"
            value=state.phone
            onBlur=onBlur
            error="${error?.phone || ''}"
        }}}
                </div>
                <div class="actions">
                    <div>
        {{{ Button
            type="submit"
            class="link-button"
            label="Изменить данные"
        }}}
                    </div>
                    <div><a href="#">Изменить пароль</a></div>
                    <div class="row">
                    <div>Старый пароль</div>
        {{{ Field
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder="Старый пароль"
            value=state.oldPassword
            onBlur=onBlur
            error="${error?.oldPassword || ''}"
        }}}
                    </div>
                    <div class="row">
                    <div>Новый пароль</div>
        {{{ Field
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Новый пароль"
            value=state.newPassword
            onBlur=onBlur
            error="${error?.newPassword || ''}"
        }}}
                    </div>
                    {{{ Button
                      type="submit"
                      class="button__orange"
                      label="Выйти"
                    }}}
                    {{{ ButtonBack }}}
                </div>                      
            </div>
        </div>
    </form>
</div>    
    `);
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
