import Block from '../../../utils/Block';
import ChatsController from '../../../controller/ChatsController';
import connect from '../../../utils/Connect';
import { Indexed, User } from '../../../types/types';

class AddUser2Chat extends Block {
  protected initial = {
    message: '',
    error: {},
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'AddUser2Chat',
      addUser: (e: Event) => {
        const target = e.target as HTMLElement;
        const { activeChatId } = props.state;
        const userId: string = target.dataset.id || '';

        ChatsController.appendUser([userId], activeChatId);
      },
      ...props,
    });

    this.setProps(this.initial);
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log(state);
    return true;
  }

  render() {
    const { props } = this;
    const { users = [] } = props.state;

    return (`
<div class="window">
  <div class="card">
    <h2>Добавить пользователя к чату</h2>
    <ul class="flat-list">
    ${users.length ? users.map((user: User) => `
        <li class="">
        {{{ Button
          class="btn btn_full btn_plain"
          label="${user.login}" 
          onClick=addUser 
          data-id="${user.id}"
        }}}
        </li>`).join('') : ''}
    </ul> 
  </div>
</div>
  `);
  }
}

const mapStateToProps = (state: Indexed) => ({
  users: state.users,
  activeChatId: state.activeChatId,
});

export default connect(mapStateToProps)(AddUser2Chat);
