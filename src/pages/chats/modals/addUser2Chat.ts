import Block from '../../../utils/Block';
import ChatsController from '../../../controller/ChatsController';
import connect from '../../../utils/Connect';
import { Indexed } from '../../../types/types';

class AddUser2Chat extends Block {
  constructor(props: Record<string, any>) {
    super({
      componentName: 'AddUser2Chat',
      addUser: (e: Event) => {
        const target = e.target as HTMLElement;
        const { activeChatId } = props.state;
        const userId: string = target.dataset.id || '';

        ChatsController.appendUser([userId], activeChatId);
      },
      ...props,
    });
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log(state);
    return true;
  }

  render() {
    const { props } = this;
    const { error } = props.state;

    return (`
<div class="window">
  <div class="card">
  <h2>Введите имя пользователя</h2> 
  <form action="#" name="comment" class="row row_nowrap row_gap-sm" style="width: 100%">
      <div class="textarea corner">
      {{{ Field 
          name="title"
          class=""
          value=""
          error="${error?.message || ''}"
          onInput=onInput
          }}}
      </div>
  </form>
 {{{ UserList activeChatId=activeChatId }}}
  </div>
</div>
  `);
  }
}

const mapStateToProps = (state: Indexed): Indexed => <Indexed>({
  users: state.users,
  user: state.user,
  activeChatId: state.activeChatId,
});

export default connect(mapStateToProps)(AddUser2Chat);
