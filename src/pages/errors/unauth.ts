import Block from '../../utils/Block';

export default class UnAuth extends Block {
  constructor() {
    super({ componentName: 'Unauthorized' });
  }

  render() {
    return (`
<div class="window">
  <h1>Необходима авторизация</h1>
  <a href="/login">Авторизация</a>
</div>
`);
  }
}
