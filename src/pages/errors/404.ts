import Block from '../../utils/Block';

export default class Error404 extends Block {
  constructor() {
    super({ componentName: 'Error404' });
  }

  render() {
    return (`
<div class="window">
  <h1>404 - Страница не найдена</h1>
  <a href="/">Вернуться на главную</a>
</div>
`);
  }
}
