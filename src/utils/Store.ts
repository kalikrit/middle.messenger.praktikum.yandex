import EventBus from './EventBus';
import { messengerSet } from './Utils';
import { Indexed } from '../types/types';

export enum StoreEvents {
    Updated = 'updated',
}

// наследуем Store от EventBus,
// чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: Indexed;

  constructor() {
    super();
    this.state = {
      error: null,
      user: null,
      users: [],
      messages: [],
      activeChatId: null,
      chats: [],
      chatUsers: [],
      auth: false,
    };
  }

  public getState(): Indexed {
    return this.state;
  }

  public set(path: string, value: unknown) {
    messengerSet(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated, path);
  }
}

export default new Store();
