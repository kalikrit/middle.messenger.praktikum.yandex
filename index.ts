import Handlebars from 'handlebars'
import './src/pages/common.scss'
import Block from './src/utils/Block'
import * as components from './src/partials'
import { register } from './src/utils/Template'
import LoginForm from './src/pages/login/login'
import RegistrationForm from './src/pages/registration/registration'
import Error404 from './src/pages/errors/404'
import Error500 from './src/pages/errors/500'

//Handlebars.registerPartial('layoutProfile', layoutProfile);

Object.entries(components).forEach((component) => register(component));

const Login = new LoginForm();
const Registration = new RegistrationForm();
const E404 = new Error404();
const E500 = new Error500();

// const Profile = new ProfilePage();
// const ProfileEdit = new ProfileEditPage();
// const Chats = new ChatsPage();
// const Error404 = new ErrorPage({ code: 404, text: 'Не туда попали' });
// const Error500 = new ErrorPage({ code: 500, text: 'Мы уже фиксим' });
// const ProfileEditPassword = new ProfileEditPasswordPage();

const urlParams = new URLSearchParams(window.location.search);
const page: string | null = urlParams.get('page');

const pages: Record<string, Block> = {
  login: Login,
  register: Registration,
  e404: E404,
  e500: E500
//   chats: Chats,
//   profile: Profile,
//   profileEdit: ProfileEdit,
//   profileEditPassword: ProfileEditPassword,
};
const main = document.querySelector('#main');
if (main) {
  if (page) {
    const node = pages[page].getNode();
    main.append(node);
  } else {
    // страница не найдена
    main.append(E404.getNode())
  }
}
