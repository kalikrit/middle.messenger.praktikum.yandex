import Block from '../../utils/Block';

export default class ButtonBack extends Block {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'ButtonBack', ...props });
  }

  init() {
    return true;
  }

  render() {
    return (`
<button
 class="button__gray"
 onclick="window.location.href = 'messenger?id=37566';"
 >
 Назад
 </button>
    `);
  }
}
