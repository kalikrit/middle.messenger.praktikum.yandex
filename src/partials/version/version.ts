import Block from '../../utils/Block';

export default class Version extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Version', ...props });
  }

  render() {
 return (`
    <div class="version">Version: 3.5.9 / 30.11.2023</div>
`);
  }
}
