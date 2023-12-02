import Block from '../../../../utils/Block'

interface IPropsChatUser {
  user: string,
  message: string,
  time: string,
  unread: string,
}

export default class ChatUser extends Block {
  constructor(props:IPropsChatUser) {
    super({ name: 'ChatUser', ...props });
  }

  init() {
    const { props } = this;
    this.events = {
      click: () => {
        props.onClick(props.id);
      },
    };
    return true;
  }

  render() {
return `
  <div>
    <div class="avatar">{{avatar}}</div>
    <div class="user">
    {{ title }}
    <div class="last-message">{{last_message.content}}</div>
    </div>
    <time class="lm-time">{{created_by}}</time>
  </div>
`;
  }
}
