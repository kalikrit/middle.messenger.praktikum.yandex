import Block from '../../../utils/Block';
import validateForm from '../../../utils/Validation';
import UserController from '../../../controller/UserController';

const uctl = new UserController();
export default class ChangePassword extends Block {
  constructor(props: Record<string, any>) {
    super({
      componentName: 'ChangePassword',
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
      ...props,
    });
  }

  init(): boolean {
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

    uctl.password(formObject);
    this.router.back();
  }

  render() {
    const { props } = this;
    const { error } = props.state;

    return (`
<div class="window">
<div class="card">
  <h2>Изменить пароль</h2>
  <form>
    <div class="input-box">
    {{{ Field 
        id="oldPassword"
        name="oldPassword" 
        label="Пароль"
        type="password"
        value=state.oldPassword
        error="${error?.oldPassword || ''}"
        onBlur=onBlur
    }}}
    </div>
    <div class="input-box">
    {{{ Field 
        id="newPassword"
        name="newPassword" 
        label="повторите пароль"
        type="password"
        value=state.newPassword
        error="${error?.newPassword || ''}"
        onBlur=onBlur
    }}}
    </div>
    {{{ Button
      type="submit"
      class="button"
      label="Изменить"
    }}}
    {{{ ButtonBack }}}
  </form>
</div>
</div>
`);
  }
}
