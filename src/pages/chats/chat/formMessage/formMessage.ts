import Block from '../../../../utils/Block';
import formValidate from '../../../../utils/Validation';
import ChatsController from '../../../../controller/ChatsController';

export default class FormMessage extends Block {
  protected initial = {
    message: '',
    error: {},
  };

  constructor() {
    super({
      componentName: 'FormMessage',
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
    });

    this.setProps(this.initial);
  }

  init(): boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
    };
    return true;
  }

  validateField(event: Record<string, any>) {
    const { target } = event;
    const { name, value } = target;
    const input = { [name]: value };
    const errorField: Record<string, any> = formValidate(input);
    const { props } = this;
    const { error } = props;
    const updateError = { ...error, [name]: errorField[name] };
    this.setProps({
      ...input,
      error: updateError,
    });
  }

  validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const error = formValidate(formObject);
    this.setProps({ ...formObject, error });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const formObject: Record<string, any> = Object.fromEntries(formData.entries());

    ChatsController.appendMessages(formObject.message);
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
<form action="#" name="message">
  <div>
  {{{ Field 
  name="message" 
  label="Сообщение"
  class=""
  error="${error?.message || ''}"
  }}}
  <button class="btn-icon" type="submit" name="send">
<span class="arrow-icon">
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="14" cy="14" r="14" fill="#176909"/>
  <rect x="8" y="13.2" width="11" height="1.6" fill="white"/>
  <path d="M15 9L19 14L15 19" stroke="white" stroke-width="1.6"/>
  </svg>
</span>
  </button>
  </div>
</form>
                    `);
  }
}
