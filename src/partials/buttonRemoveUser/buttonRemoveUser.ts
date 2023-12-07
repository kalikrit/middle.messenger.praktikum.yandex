import Block from '../../utils/Block';

export default class ButtonRemoveUser extends Block {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'ButtonRemoveUser', ...props });
  }

  init() {
    this.events = {
      click: this.onClick.bind(this),
    };
    return true;
  }

  onClick() {
    this.router.go('removeUser');
  }

  render() {
    return (`
{{{ Button
    type="button"
    name="button"
    label="Удалить пользователя"
    class="button__orange"
}}}
    `);
  }
}
