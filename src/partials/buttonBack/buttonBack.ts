import Block from '../../utils/Block';

export default class ButtonBack extends Block {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'ButtonBack', ...props });
  }

  init() {
    this.events = {
      click: this.onClick.bind(this),
    };
    return true;
  }

  onClick() {
    this.router.go('messenger');
  }

  render() {
    return (`
{{{Button
    type="button"
    name="button"
    label="Назад"
    class="button__gray"
}}}
    `);
  }
}
