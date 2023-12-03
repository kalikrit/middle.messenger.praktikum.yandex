import ApiChat from '../services/chat.ts';
import store from '../utils/Store.ts';
import { isArray } from '../utils/Utils.ts';

/**
 * контроллер чата
 */
class ChatsController {
  private api: ApiChat;

  private socket: WebSocket | null;

  constructor() {
    this.api = new ApiChat();
    this.socket = null;
  }

  public getChats() {
    this.api.chats()
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          setTimeout(() => {
            store.set('chats', JSON.parse(data.response));
            // window.localStorage.setItem('chats', data.response);
          }, 0);
        }
        return true;
      }).catch((error: Error) => {
        console.error(`get user chats error: ${error}`);
      });
  }

  public getUsers(id: string) {
    this.api.getUsers(id)
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          store.set('chatUsers', JSON.parse(data.response));
        }
        return true;
      }).catch((error: Error) => {
        console.error(`get users for chat error: ${error}`);
      });
  }

  public createChat(body: Record<string, any>) {
    this.api.create(body)
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          this.getChats();
        }
      }).catch((error: Error) => {
        console.error(`auth error: ${error}`);
      });
  }

  getToken(id: string) {
    return this.api.getToken(id)
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          return JSON.parse(data.response).token;
        }
        return {};
      }).catch((error: Error) => {
        console.error(`cannot get token: ${error}`);
      });
  }

  getMessages(socket: WebSocket) {
    socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }

  appendMessages(message: Record<string, any>[]) {
    this.socket?.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  toChat(activeChatId: string, token: string) {
    const { user } = store.getState();

    const messages: Record<string, any>[] = [];

    const socket = this.api.getChat(user?.id, activeChatId, token);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.getMessages(socket);
      this.getUsers(activeChatId);
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        /* eslint no-console: 0 */
        console.log('Соединение закрыто чисто');
      } else {
        /* eslint no-console: 0 */
        console.log('Обрыв соединения');
      }
      /* eslint no-console: 0 */
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
      /* eslint no-console: 0 */
      console.log('Получены данные', event.data);
      try {
        const data = JSON.parse(event.data);

        if (isArray(data)) {
          // eslint-disable-next-line max-len
          const sort = (a:Record<string, any>, b: Record<string, any>) => (b.time - a.time ? 1 : -1);
          const sortedMessages = data.sort(sort);
          messages.push(...sortedMessages);
          store.set('messages', [...messages]);
        } else {
          messages.push(data);
          store.set('messages', [...messages]);
        }
      } catch (e) {
        console.error(`ERROR while parsing json: ${e}`);
      }
    });

    socket.addEventListener('error', (event: Record<string, any>) => {
      /* eslint no-console: 0 */
      console.log('Ошибка', event.message);
    });

    this.socket = socket;
  }

  appendUser(users: [string], chatId: string) {
    this.api.appendUser(users, chatId)
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          this.getUsers(chatId);
        }
      }).catch((error: Error) => {
        /* eslint no-console: 0 */
        console.error(`append user error: ${error}`);
      });
  }

  removeUser(users: [string], chatId: string) {
    this.api.removeUser(users, chatId)
      .then((data: Record<string, any>) => {
        if (data.status === 200) {
          // store.set('chats', JSON.parse(data.response));
          this.getUsers(chatId);
        }
      }).catch((error: Error) => {
        /* eslint no-console: 0 */
        console.error(`remove user from chat error: ${error}`);
      });
  }
}

export default new ChatsController();
