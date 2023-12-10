import Block from '../../utils/Block.ts';
import template from './chats.hbs?raw';
import { ChatUsers } from './chatusers';
import { Chat } from './chat/index';
import ChatsController from '../../controller/ChatsController';
import store from '../../utils/Store.ts';

class Chats extends Block {
  protected initial = {
    activeChatId: null,
    token: null,
    createChatModal: false,
  };

  constructor(props: Record<string, string | number>) {
    super({
      componentName: 'Chats',
      setActive: (id: string) => {
        store.set('activeChatId', id);

        setTimeout(() => {
          this.setActiveChat(id);
        }, 0);
      },
      createChat: () => {
        this.createChat.apply(this);
      },
      ...props,

    }, { ChatUsers, Chat });
    const id: string | undefined = window.location.search.split('=')[1];
    if (id) this.setActiveChat(id);
  }

  async setActiveChat(id: string) {
    const token = await ChatsController.getToken(id);
    ChatsController.toChat(id, token);
  }

  createChat() {
    this.router.go('createChat');
  }

  componentDidUpdate(): boolean {
    return true;
  }

  onProfile() {
    this.router.go('settings');
  }

  render() {
    return template;
  }
}

export default Chats;
