import Block from '../../../utils/Block';
import ChatsController from '../../../controller/ChatsController';

export default class AppendChatModal extends Block {
  protected initial = {
    message: '',
    error: {},
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'addChatModal',
      ...props,
    });

    this.setProps(this.initial);
  }

  init(): boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
      click: (e) => e.stopPropagation(),
    };
    return true;
  }

  onSubmit(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());
    ChatsController.createChat(formObject);
    this.router.go('chats');
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
  <h2>Введите название чата</h2>
  <form>
  <div class="input-box">
    {{{ Field 
        name="title" 
        label="Название чата"
        class=""
        value=state.message
        error="${error?.message || ''}"
        onBlur=onBlur
        }}}
  </div>
    {{{ Button
      type="submit"
      class="button"
      label="Создать"
    }}}
    {{{ ButtonBack }}}
</form>
</div>
</div>
  `);
  }
}
