import Block from '../../utils/Block';

// interface
interface IPropsInput {
  id: string,
  type: string,
  name: string,
  label: string,
  placeholder: string,
  value: string,
  autocomplete: boolean
}

export default class Input extends Block {
  constructor(props: IPropsInput) {
    super({ componentName: 'Input', ...props });
  }

  // инициализация, плюс слушатели
  init() {
    const { props } = this;
    this.events = {
      blur: props.onBlur,
    };

    return true;
  }

  render() {
    return (`
  <input
    id="{{ id }}"
    name="{{ name }}"
    type="{{ type }}"
    value="{{ value }}"
    autocomplete="{{ autocomplete }}"
    placeholder="{{ placeholder }}"
    class="input"
  />
  `);
  }
}
