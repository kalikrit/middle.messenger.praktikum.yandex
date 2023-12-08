import Block from '../../../utils/Block';
import ChatsController from '../../../controller/ChatsController';
import connect from '../../../utils/Connect';
import { Indexed } from '../../../types/types';

class RemoveUserFromChat extends Block {
  protected initial = {
    message: '',
    error: {},
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'RemoveUserFromChat',
      removeUser: (e: Event) => {
        const target = e.target as HTMLElement;
        const { activeChatId } = props.state;
        const userId: string = target.dataset.id || '';
        ChatsController.removeUser([userId], activeChatId);
        setTimeout(() => {
          const messageEl: HTMLElement | any = document.getElementById('message');
          messageEl.textContent = `
          ПОЛЬЗОВАТЕЛЬ УДАЛЕН ИЗ ВЫБРАННОГО ЧАТА`;
        }, 10);
      },
      ...props,
    });
  }

  render() {
    return (`
<div class="window">
  <div class="card">
    <h2>Удалить пользователя из чата</h2>
      {{{ Button 
        class="button__orange"
        label="konst"
        onClick=removeUser
        data-id="1348797"
      }}}
      <div id="message"></div>
      {{{ ButtonBack }}}
  </div>
</div>    
  `);
  }
}

const mapUserToProps = (state: Indexed) => ({
  activeChatId: state.activeChatId,
  chatUsers: state.chatUsers,
});

export default connect(mapUserToProps)(RemoveUserFromChat);
