import Block from '../../utils/Block';

export default class Error500 extends Block {

  constructor() {
    super({ componentName: 'Error500' });
  }

  render() {
 return (`
<div class="window">
 <h1>500 - Ошибка на стороне сервера</h1>
 <h3>Попробуйте перезагрузить страницу</h3>
 <a href="/?page=chats">Вернуться к чатам</a>
</div>
`);
  }
}
