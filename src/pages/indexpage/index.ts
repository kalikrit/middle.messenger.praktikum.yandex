import Block from '../../utils/Block';

export default class IndexPage extends Block {

  constructor() {
    super({ componentName: 'IndexPage' });
  }

  render() {
 return (`
 <div class="window">
 <h2>Мессенджер Практикум</h2>
 <nav>
   <ul>
     <li><a href="/login">Авторизация</a></li>
     <li><a href="/register">Регистрация</a></li>
     <li><a href="/chats">Список чатов</a></li>
     <li><a href="/settings">Настройки пользователя</a></li>
   </ul>
 </nav>
 {{{ Version }}}
</div>
`);
  }
}
