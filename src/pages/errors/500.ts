import Block from '../../utils/Block';

export default class Error500 extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Error500', ...props });
  }

  render() {
 return (`
<div class="window">
 <h1>500 - Ошибка на стороне сервера</h1>
 <h3>Попробуйте перезагрузить страницу</h3>
 <a href="/src/pages/chatlist/chatlist.html">Вернуться к чатам</a>
</div>
`);
  }
}
