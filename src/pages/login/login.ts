import Block from '../../utils/Block';

export default class LoginForm extends Block {
  protected initial = {
    login: '',
    password: '',
    error: {},
  };

  constructor() {
    super({ componentName: 'Login' });
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
    <h4>Войти в мессенджер</h4>
    <form action="preventDefault()" method="POST">
      <div class="input-box">
      {{{ Field 
        name="login" 
        label="Логин"
        class="text-input_flat text-input_flat_ocean"
        toggle=true
        value=state.login
        error="${error?.login || ''}"
        onBlur=onBlur
        }}}        
      </div>
      <div class="input-box">
      {{{ Field 
        name="password"
        label="Пароль"
        class="text-input_flat text-input_flat_ocean"
        toggle=true value=state.password
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
      <a href="/?page=register">Ещё не зарегистрированы?</a>
    </div>
  </div>
</div>  
`);
  }
}
