import Block from '../../utils/Block';
import validateForm from '../../utils/Validation';

export default class LoginForm extends Block {
  protected initial = {
    login: '',
    password: '',
    error: {},
  };

  constructor() {
    super({ 
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
     });
    this.setProps(this.initial);
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
    <h4>Войти в мессенджер</h4>
    <form action="preventDefault()" method="POST">
      <div class="input-box">
      {{{ Field 
        name="login"
        id="login"
        type="text"
        label="Логин"
        placeholder="Ваш логин"
        autocomplete="true"
        value=state.login
        error="${error?.login || ''}"
        onBlur=onBlur
      }}}        
      </div>
      <div class="input-box">
      {{{ Field
        id="password"
        name="password"
        type="password"
        label="Пароль"
        placeholder="Пароль"
        autocomplete="true"
        value=state.password
        onBlur=onBlur
        error="${error?.password || ''}"
      }}}      
      </div>
      {{{ Button
        type="submit"
        class="button"
        label="Войти"
      }}}
    </form>
    <div>
      <a href="/register">Ещё не зарегистрированы?</a>
    </div>
  </div>
  {{{ Version }}}
</div>  
`);
  }
}
