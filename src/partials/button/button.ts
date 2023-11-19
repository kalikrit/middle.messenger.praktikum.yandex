import Block from '../../utils/Block';

export default class Button extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Button', ...props });
  }

  render() {
 return (`
<button
 type="{{ type }}"
 class="{{ class }}"
>
{{ label }}
</button>
`);
  }
}
