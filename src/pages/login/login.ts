import Block from '../../utils/Block';
import validateForm from '../../utils/Validation';
import UserController from '../../controller/UserController';

const uctl = new UserController();

export default class LoginForm extends Block {
  protected initial = {
    login: '',
    password: '',
    error: {},
  };

  constructor(props: Record<string, string | number>) {
    super({
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
      onRegister: () => {
        this.onRegister.apply(this);
      },
      ...props,
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

  validateForm(formObject: object) {
    const error = validateForm(formObject);
    this.setProps({ ...formObject, error });

    return Object.keys(error).length === 0;
  }

  onSubmit(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;

    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());
    const valid = this.validateForm(target);

    if (!valid) return;

    uctl.authUser(formObject);
  }

  onRegister() {
    this.router.go('register');
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    const { props } = this;
    const { error } = props.state;

    return (`
<div class="window">
  <div class="card">
    <h4>Войти в мессенджер</h4>
    <form>
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
      <a href="/sign-up">Ещё не зарегистрированы?</a>
    </div>
  </div>
  {{{ Version }}}
</div>  
`);
  }
}
