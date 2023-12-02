import Block from '../../utils/Block';

export default class Version extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Version', ...props });
  }

  render() {
 return (`
    <div class="version">Version: 3.7.4 / 2.12.2023</div>
`);
  }
}
