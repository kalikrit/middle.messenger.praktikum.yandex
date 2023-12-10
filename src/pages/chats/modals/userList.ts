import Block from '../../../utils/Block';
import ChatsController from '../../../controller/ChatsController';
import connect from '../../../utils/Connect';
import { Indexed, User } from '../../../types/types';

class UserList extends Block {
  constructor(props: Record<string, any>) {
    super({
      componentName: 'userList',
      addUser: (e: Event) => {
        const target = e.target as HTMLElement;
        const { activeChatId } = props.state;
        const userId: string = target.dataset.id || '';

        ChatsController.appendUser([userId], activeChatId);
        setTimeout(() => {
          const usersEl: HTMLElement | any = document.getElementById('users');
          usersEl.innerHTML = `
          ПОЛЬЗОВАТЕЛЬ УСПЕШНО ДОБАВЛЕН 
             В ВЫБРАННЫЙ ЧАТ
          `;
        }, 10);
      },
      ...props,
    });
  }

  init(): boolean {
    return true;
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    const { props } = this;
    const { users = [] } = props.state;

    return (`
<ul id="users">
    ${users.length ? users.map((user: User) => `
    <li class="">
    {{{ Button 
      label="${user.login}" 
      onClick=addUser 
      data-id="${user.id}"
    }}}
    </li>`).join('') : ''}
</ul>
`);
  }
}

const mapStateToProps = (state: Indexed) => ({
  users: state.users,
  activeChatId: state.activeChatId,
});

export default connect(mapStateToProps)(UserList);
