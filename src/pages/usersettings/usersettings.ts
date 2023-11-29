import Block from '../../utils/Block'
import validateForm from '../../utils/Validation'
import UserController from '../../controller/UserController'

const uctl = new UserController();

export default class UserSettings extends Block {

    constructor() {
      super({
        componentName: "UserSettings",
        onBlur: (e: Record<string, any>) => {
          this.validateField(e)
        },
        onSubmit: () => {
          this.onLogout.apply(this)
          //this.onSubmit.apply(this)
        }
      });
    }

    init():boolean {
      this.events = {
        submit: this.onLogout.bind(this),
      };
      return true;
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
    
    validateForm(form: HTMLFormElement) {
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());
      const error = validateForm(formObject);
  
      this.setProps({ ...formObject, error });
    }
  
    onSubmit(event: Record<string, any>) {
      event.preventDefault();
      const { target } = event;
      this.validateForm(target);
    }

    onLogout(event: Record<string, any>) {
      uctl.logout();
    }

    componentDidUpdate(): boolean {
      const { state } = this.props;
      /* eslint no-console: 0 */
      console.log(state);
      return true;
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
                    {{{ Button
                      type="button"
                      class="button__gray"
                      label="Назад"
                      onClick=back
                    }}}
                </div>                      
            </div>
        </div>
    </form>
</div>
`);
  }
}
