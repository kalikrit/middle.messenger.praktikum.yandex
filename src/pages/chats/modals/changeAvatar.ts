import Block from '../../../utils/Block';
import UserController from '../../../controller/UserController';

const uctl = new UserController();

export default class ChangeAvatar extends Block {
  protected initial = {
    message: '',
    error: {},
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'ChangeAvatar',
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
    uctl.avatar(formData);
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
    const { user = {} } = props.state;

    return (`
<div class="window">
<div class="card">
  <div class="avatar">
    <img
    class='avatar'
    src='${user?.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : '/ava.png'}'
    /> 
  </div>
  <h2>Выберите изображение</h2>
  <form>
    <div class="input-box">
      {{{ Field 
          name="avatar" 
          label="Изображение"
          value=state.message
          error="${error?.message || ''}"   
          type="file"
          }}}
    </div>
    {{{ Button
      type="submit"
      class="button"
      label="Загрузить"
    }}}
    {{{ ButtonBack }}}
  </form>
</div>
</div>
`);
  }
}
