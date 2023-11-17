import Block from '../../utils/Block';

interface IPropsInput {
  id: string,
  type: string,
  name: string,
  label: string,
  placeholder: string,
  value: string,
}

export default class Input extends Block {
  
  constructor(props: IPropsInput) {
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
