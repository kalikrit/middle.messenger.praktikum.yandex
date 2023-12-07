import Block from '../../utils/Block';

export default class ButtonAddUser extends Block {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'ButtonAddUser', ...props });
  }

  init() {
    this.events = {
      click: this.onClick.bind(this),
    };
    return true;
  }

  onClick() {
    this.router.go('addUser');
  }

  render() {
    return (`
{{{ Button
    type="button"
    name="button"
    label="Добавить пользователя"
    class="button"
}}}
    `);
  }
}
