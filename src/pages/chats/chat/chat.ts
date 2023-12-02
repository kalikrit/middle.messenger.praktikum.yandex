import Block from '../../../utils/Block';
import { FormMessage } from './formMessage/index';
import connect from '../../../utils/Connect';
import { isArray, formatTime } from '../../../utils/Utils';
import { Indexed } from '../../../types/types';

interface IPropsChat {
  author: string,
  time: string,
}

const formatMessages = (messages: [any], userId: string) => messages && messages?.map((item) => ({
  ...item,
  author: item.user_id === userId,
  time: formatTime(item.time),
}));

class Chat extends Block {
  constructor(props:IPropsChat) {
    super(
      { componentName: 'Chat', ...props },
      { FormMessage });
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    let messages: any[] | undefined = [];

    const { state } = this.props;
    const { user } = state;

    if (isArray(state.messages)) {
      messages = formatMessages(state.messages, state.user.id);
    } else if (state.messages) {
      messages.push(...formatMessages([state.messages], state.user.id));
    }

return (`
${!state.activeChatId
  ? `
    <div class="chat_greet">Выберите чат для начала общения</div>
    `
  : `<div class="main_chat">
  <div class="dialog chat__dialog">
${messages?.map((item) => (`
  <div class="row">
    <div class="${item.author ? 'chat-message sent' : 'chat-message receive'}">
      ${item.content}
    </div>
    <div class="lm-time">${item.time}</div>
  </div>
`)).join(' ')}
  </div>
  <div class="message">
      {{{ FormMessage }}}
  </div>
  </div>`}
    `);
  }
}

const mapChatToProps = (state: Indexed): Indexed => <Indexed>({
  messages: state.messages,
  user: state.user,
  activeChatId: state.activeChatId,
});

export default connect(mapChatToProps)(Chat);
