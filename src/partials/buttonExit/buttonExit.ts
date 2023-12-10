import Block from '../../utils/Block';
import UserController from '../../controller/UserController';

const uctl = new UserController();

export default class ButtonExit extends Block {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'ButtonExit', ...props });
  }

  init() {
    this.events = {
      click: this.onClick.bind(this),
    };
    return true;
  }

  onClick() {
    uctl.logout();
  }

  render() {
    return (`
{{{Button
    type="button"
    name="button"
    label="Выйти"
    class="button__orange"
}}}
    `);
  }
}
