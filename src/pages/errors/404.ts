import Block from '../../utils/Block';

export default class Error404 extends Block {

  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Error404', ...props });
  }

  render() {
 return (`
<div class="window">
  <h1>404 - Страница не найдена</h1>
  <a href="/src/pages/chatlist/chatlist.html">Вернуться к чатам</a>
</div>
`);
  }
}
