import { beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import Router from './Router';

describe('Router', () => {
  let router: Router;
  const main = document.querySelector('#main');

  class FakeBlock {
    getNode() {
      return document.createElement('div');
    }
  }

  beforeEach(() => {
    router = new Router(main);
  });

  it('new router instance should return the same instance', () => {
    const newRouter = new Router(main);
    expect(newRouter).to.eq(router);
  });

  it('should history length is 1 after init router', () => {
    router.start();
    expect(window.history.length).to.eq(1);
  });

  it('should get redirect', () => {
    router.redirect('', 'login');
    router.start();
    router.go('');
    expect(window.location.pathname).to.eq('/login');
  });
});
