import Block from '../../utils/Block';

export default class Version extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Version', ...props });
  }

  render() {
    return (`
    <div class="version">Version: 4.0.4 / 13.12.2023</div>
`);
  }
}
