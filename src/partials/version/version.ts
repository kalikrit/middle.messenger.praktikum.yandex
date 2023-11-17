import Block from '../../utils/Block';

export default class Version extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Version', ...props });
  }

  render() {
 return (`
    <div class="version">Version: 1.4.1 / 18.11.2023</div>
`);
  }
}
