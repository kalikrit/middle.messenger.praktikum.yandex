import Block from '../../utils/Block';

export default class RegistrationForm extends Block {
  protected initial = {};

  constructor() {
    super({ componentName: 'Registration' });
    this.setProps(this.initial);
  }

  init():boolean {
    // this.events = {
    //   submit: this.onSubmit.bind(this),
    // };
    return true;
  }

//   validateField(event: Record<string, any>) {
//     event.preventDefault();
//     const { target } = event;
//     const { name, value } = target;
//     const input = { [name]: value };
//     const errorField: Record<string, any> | boolean = formValidate(input);
//     const { props } = this;
//     const { error } = props.state;
//     const updateError = { ...error, [name]: errorField[name] };
//     this.setProps({
//       ...input,
//       error: updateError,
//     });
//   }

//   validateForm(form: HTMLFormElement) {
//     const formData = new FormData(form);
//     const formObject = Object.fromEntries(formData.entries());
//     const error = formValidate(formObject);

//     this.setProps({ ...formObject, error });
//   }

//   onSubmit(event: Record<string, any>) {
//     event.preventDefault();
//     const { target } = event;
//     this.validateForm(target);
//   }

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
                name="email"
                type="email"
                label="Почта"
                placeholder="Почта"
                toggle=true value=state.email
                onBlur=onBlur
                error="${error?.email || ''}"
              }}}
            </div>
            <div class="input-box">
            {{{ Field 
                name="login"
                type="text"
                placeholder="Ваш логин"
                label="Логин"
                toggle=true value=state.login
                onBlur=onBlur
                error="${error?.login || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field 
                name="first_name"
                type="text"
                label="Имя"
                placeholder="Ваше имя"
                toggle=true value=state.first_name
                onBlur=onBlur
                error="${error?.first_name || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field 
                name="second_name"
                type="text"
                placeholder="Фамилия"
                label="Фамилия"
                toggle=true value=state.second_name
                onBlur=onBlur
                error="${error?.second_name || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field 
                name="phone"
                type="phone"
                label="Телефон"
                placeholder="+7 (111) 222 33 44"
                toggle=true value=state.phone
                onBlur=onBlur
                error="${error?.phone || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field 
                name="password"
                type="password"
                label="Пароль"
                placeholder="Пароль"
                toggle=true value=state.password
                onBlur=onBlur
                error="${error?.password || ''}"
            }}}
            </div>
            <div class="input-box">
            {{{ Field 
                name="password_again"
                type="password"
                label="Повторите пароль"
                placeholder="Повторите пароль"
                toggle=true value=state.password_again
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
</div>
`);
  }
}
