import Block from '../../utils/Block';

export default class Field extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Input', ...props });
  }

  render() {
    return (`
  <input
    id="{{ id }}"
    name="{{ name }}"
    type="{{ type }}"
    value="{{ value }}"
    placeholder="{{ placeholder }}"
    class="input"
  />
  `);
  }
}
