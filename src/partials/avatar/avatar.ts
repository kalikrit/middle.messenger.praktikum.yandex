import Block from '../../utils/Block';

export default class Avatar extends Block {
  constructor(props: Record<string, string | any>) {
    super({ componentName: 'Avatar', ...props });
  }

  init() {
    this.events = {
      click: this.onClick.bind(this),
    };
    return true;
  }

  onClick() {
    this.router.go('changeAvatar');
  }

  render() {
return (`
    <img
        class='avatar__settings'
        src='https://ya-praktikum.tech/api/v2/resources{{ avatar }}'/>
    /> 
    `);
  }
}