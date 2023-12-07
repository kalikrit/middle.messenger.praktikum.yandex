import Block from '../../../../utils/Block';

interface IPropsChatUser {
  user: string,
  message: string,
  time: string,
  unread: string,
  avatar: string,
}

export default class ChatUser extends Block {
  constructor(props:IPropsChatUser) {
    super({
      componentName: 'ChatUser',
      ...props,
    });
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
    const { props } = this;
    console.log('from chatUser:', props);
    // const { avatar } = props;
    return `
  <div>
    <img class='avatar__settings'
    src='{{ avatar }}' style="border-radius: 50%; height: 50px"
    />     
    <div class="user">
    {{ title }}
    <div class="last-message">{{ last_message.content }}</div>
    </div>
    <time class="lm-time">{{ created_by }}</time>
  </div>
`;
  }
}
