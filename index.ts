import Block from './src/utils/Block';
import * as partials from './src/partials';
import { register } from './src/utils/Template';
import LoginForm from './src/pages/login/login';
import RegistrationForm from './src/pages/registration/registration';
import Chats from './src/partials/chats/index';
import UserSettings from './src/pages/usersettings/usersettings';
import Error404 from './src/pages/errors/404';
import UnAuth from './src/pages/errors/unauth';
import IndexPage from './src/pages/indexpage/index';
import AppendChatModal from './src/pages/chats/modals/appendChatModal';
import AddUser2Chat from './src/pages/chats/modals/addUser2Chat';
import RemoveUserFromChat from './src/pages/chats/modals/removeUserFromChat';
import ChangeAvatar from './src/pages/chats/modals/changeAvatar';
import ChangePassword from './src/pages/chats/modals/changePassword';

import Router from './src/utils/Router';
import store, { StoreEvents } from './src/utils/Store';
import UserController from './src/controller/UserController';

import './src/pages/common.scss';

Object.entries(partials)
  .forEach((partial) => register(partial));

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
      router.redirect('', 'messenger');
      router.use('messenger', Chats);
      router.use('settings', UserSettings);
      router.use('createChat', AppendChatModal);
      router.use('addUser', AddUser2Chat);
      router.use('removeUser', RemoveUserFromChat);
      router.use('changeAvatar', ChangeAvatar);
      router.use('changePassword', ChangePassword);

      userController.getUser();
    } else {
      router.redirect('', 'login');
      router.use('login', LoginForm);
      router.use('sign-up', RegistrationForm);
    }

    router.error('401', UnAuth);
    // router.error('404', Error404);
  }

  if (router._currentRoute && !router.getRoute(location)) {
    router.go('');
  }

  if (!router._currentRoute) {
    router.start();
  }
});

store.set('auth', auth && JSON.parse(auth));
