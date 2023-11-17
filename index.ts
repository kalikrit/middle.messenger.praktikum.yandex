import Block from './src/utils/Block'
import * as partials from './src/partials'
import { register } from './src/utils/Template'
import LoginForm from './src/pages/login/login'
import RegistrationForm from './src/pages/registration/registration'
import Chatlist from './src/pages/chatlist/chatlist'
import Error404 from './src/pages/errors/404'
import Error500 from './src/pages/errors/500'

import './src/pages/common.scss'

Object.entries(partials).forEach((partial) => register(partial))

const Login = new LoginForm()
const Registration = new RegistrationForm()
const E404 = new Error404()
const E500 = new Error500()
const Chats = new Chatlist()


const urlParams = new URLSearchParams(window.location.search)
const page: string | null = urlParams.get('page')

const pages: Record<string, Block> = {
  login: Login,
  register: Registration,
  e404: E404,
  e500: E500,
  chats: Chats
//   profile: Profile,
//   profileEdit: ProfileEdit,
//   profileEditPassword: ProfileEditPassword,
};
const main = document.querySelector('#main') || document.createElement('div');

if (page) {
  const node = pages[page].getNode();
  main.append(node);
} else {
  // страница не найдена
  main.append(E404.getNode())
}
