import Block from '../../utils/Block';

export default class LoginForm extends Block {
  protected initial = {
    login: '',
    password: '',
    error: {},
  };

  constructor() {
    super();
    this.setProps(this.initial);
  }

  init():boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
    };
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
<form action="#" method="POST">
    <div class="input-box">
        <label for="login">Логин</label>
        {{> input/input type="text" id="login" name="login" placeholder="Ваш логин" }}
    </div>
    <div class="input-box">
        <label for="password">Пароль</label>
        {{> input/input type="password" id="password" name="password" placeholder="Пароль" }}
    </div>
    {{> button/button type="submit" class="button" label="Войти"}}
</form>    
`);
  }
}
