import Block from './src/utils/Block'
import * as partials from './src/partials'
import { register } from './src/utils/Template'
import LoginForm from './src/pages/login/login'
import RegistrationForm from './src/pages/registration/registration'
import ChatList from './src/pages/chatlist/chatlist'
import UserSettings from './src/pages/usersettings/usersettings'
import Error404 from './src/pages/errors/404'
import Error500 from './src/pages/errors/500'
import IndexPage from './src/pages/indexpage/index'

import './src/pages/common.scss'

Object.entries(partials).forEach((partial) => register(partial))

const Login = new LoginForm()
const Registration = new RegistrationForm()
const E404 = new Error404()
const E500 = new Error500()
const Chats = new ChatList()
const USettings = new UserSettings()
const Index = new IndexPage()


const urlParams = new URLSearchParams(window.location.search)
const page: string | null = urlParams.get('page')

const pages: Record<string, Block> = {
  login: Login,
  register: Registration,
  e404: E404,
  e500: E500,
  chats: Chats,
  uset: USettings
};
const main = document.querySelector('#main') || document.createElement('div');

if (page) {
  const node = pages[page].getNode();
  main.append(node);
} else {
  main.append(Index.getNode());
}
