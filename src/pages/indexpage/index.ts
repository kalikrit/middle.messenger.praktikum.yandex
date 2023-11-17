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
     <li><a href="/?page=login">Авторизация</a></li>
     <li><a href="/?page=register">Регистрация</a></li>
     <li><a href="/?page=chats">Список чатов</a></li>
     <li><a href="/?page=uset">Настройки пользователя</a></li>
     <li><a href="/?page=e404">Страница 404</a></li>
     <li><a href="/?page=e500">Страница 500</a></li>
   </ul>
 </nav>
</div>
`);
  }
}
