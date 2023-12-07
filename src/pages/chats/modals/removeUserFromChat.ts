import Block from '../../../utils/Block';
import ChatsController from '../../../controller/ChatsController';
import connect from '../../../utils/Connect';
import { Indexed, User } from '../../../types/types';

class RemoveUserFromChat extends Block {
  protected initial = {
    message: '',
    error: {},
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'RemoveUserFromChat',
      addUser: (e: Event) => {
        const target = e.target as HTMLElement;
        const { activeChatId } = props.state;
        const userId: string = target.dataset.id || '';

        ChatsController.appendUser([userId], activeChatId);
      },
      ...props,
    });

    this.setProps(this.initial);
    console.log('STATE', props.state);
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
    <h2>Удалить пользователя из чата</h2>
    <ul>
    ${users.length ? users.map((user: User) => `
        <li>
        {{{ Button
          class="button"
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

export default connect(mapStateToProps)(RemoveUserFromChat);
