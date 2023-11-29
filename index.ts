import Block from './src/utils/Block'
import * as partials from './src/partials'
import { register } from './src/utils/Template'
import LoginForm from './src/pages/login/login'
import RegistrationForm from './src/pages/registration/registration'
import ChatList from './src/pages/chatlist/chatlist'
import UserSettings from './src/pages/usersettings/usersettings'
import Error404 from './src/pages/errors/404'
import UnAuth from './src/pages/errors/unauth'
import IndexPage from './src/pages/indexpage/index'

import Router from './src/utils/Router'
import store, { StoreEvents } from './src/utils/Store';
import UserController from './src/controller/UserController';

import './src/pages/common.scss'

Object.entries(partials)
  .forEach((partial) => register(partial))

const main = document.querySelector('#main') || document.createElement('div');
const router = new Router(main);
const userController = new UserController();
const auth = window.localStorage.getItem('auth');

store.on(StoreEvents.Updated, (prop) => {
  const state: Record<string, any> = store.getState();
  const location = window.location.pathname.slice(1);

  if (prop === 'auth') {
    if (Router.instance) {
      router.routes = [];
    }

    if (state.auth) {
      router.redirect('', 'main');
      router.use('main', IndexPage)
      router.use('chats', ChatList);
      router.use('profile', UserSettings);

      userController.getUser();

      return;
    } else {
      router.redirect('', 'login');
      router.use('main', IndexPage)
      router.use('login', LoginForm);
      router.use('register', RegistrationForm);
    }

    router.error('401', UnAuth);
    //router.error('404', Error404);
  }

  if (router._currentRoute && !router.getRoute(location)) {
    router.go('');
  }

  if (!router._currentRoute) {
    router.start();
  }
});

store.set('auth', auth && JSON.parse(auth));
