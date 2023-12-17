import Block from '../../../utils/Block';
import template from './chatusers.hbs?raw';
import { ChatUser } from './chatUser/index';
import connect from '../../../utils/Connect';
import { formatTime } from '../../../utils/Utils';
import ChatsController from '../../../controller/ChatsController';
import { Indexed } from '../../../types/types';

class ChatUsers extends Block {
  constructor(props: Record<string, string | number>) {
    super({
      componentName: 'ChatUsers',
      ...props,
    }, {
      ChatUser,
    });
  }

  init(): boolean {
    ChatsController.getChats();
    return true;
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    return template;
  }
}

const formatChats = function formatChats(chats: any[], chatId: string | null) {
  const result = chats.map((chat: Record<string, any>) => ({
    ...chat,
    avatar: chat.avatar,
    active: chat.id === chatId,
    created_by: formatTime(chat.created_by),
  }));
  return result;
};

const mapChatToProps = (state: Indexed) => {
  const chats = formatChats(state.chats, state.activeChatId);
  return {
    contacts: chats,
  };
};

export default connect(mapChatToProps)(ChatUsers);
