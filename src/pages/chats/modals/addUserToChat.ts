import Block from '../../../utils/Block';
import UserController from '../../../controller/UserController';

const uctl = new UserController();
interface IProps {
  activeChatId: number,
}
export default class AddUserToChat extends Block {
  constructor(props: IProps) {
    super({
      componentName: 'AddUserToChat',
      ...props,
    });
  }

  init(): boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
    };

    return true;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());
    const { title }:any = formObject;
    uctl.search(title);
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    return (`
<div class="window">
  <div class="card">
  <h2>Введите имя пользователя</h2> 
  <form>
    <div class="input-box">
      {{{ Field
        type="text"
        name="title"
        value=""
      }}}
    </div>
    {{{ Button
      type="submit"
      class="button"
      label="Найти"
    }}}
  </form>
 {{{ UserList
   activeChatId=activeChatId
  }}}
  {{{ ButtonBack }}}
  </div>
</div>
`);
  }
}
