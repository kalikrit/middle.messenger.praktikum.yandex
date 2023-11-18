import Block from '../../utils/Block'
import validateForm from '../../utils/Validation';

export default class RegistrationForm extends Block {

  constructor() {
    super({ 
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
     });
  }

  init():boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
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
    <div class="card">
        <h4>Регистрация</h4>
        <form action="#" method="POST">
            <div class="input-box">
            {{{ Field
                id="email"
                name="email"
                type="email"
                label="Почта"
                placeholder="Почта"
                value=state.email
                onBlur=onBlur
                error="${error?.email || ''}"
              }}}
            </div>
            <div class="input-box">
            {{{ Field
                id="login"
                name="login"
                type="text"
                placeholder="Ваш логин"
                label="Логин"
                value=state.login
                onBlur=onBlur
                error="${error?.login || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field
                id="first_name"
                name="first_name"
                type="text"
                label="Имя"
                placeholder="Ваше имя"
                value=state.first_name
                onBlur=onBlur
                error="${error?.first_name || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field
                id="second_name"
                name="second_name"
                type="text"
                placeholder="Фамилия"
                label="Фамилия"
                value=state.second_name
                onBlur=onBlur
                error="${error?.second_name || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field
                id="phone"
                name="phone"
                type="phone"
                label="Телефон"
                placeholder="+7 (111) 222 33 44"
                value=state.phone
                onBlur=onBlur
                error="${error?.phone || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field
                id="password"
                name="password"
                type="password"
                label="Пароль"
                placeholder="Пароль"
                value=state.password
                onBlur=onBlur
                error="${error?.password || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field
                id="password_again"
                name="password_again"
                type="password"
                label="Повторите пароль"
                placeholder="Повторите пароль"
                value=state.password_again
                onBlur=onBlur
                error="${error?.password_again || ''}"
            }}}
            </div>
            {{{ Button
                type="submit"
                class="button"
                label="Зарегистрироваться"
            }}}
        </form>
        <div>
            <a href="/?page=login">Войти</a>
        </div>
    </div>
    {{{ Version }}}
</div>
`);
  }
}
