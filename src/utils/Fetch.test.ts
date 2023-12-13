import { beforeEach, describe, it } from 'mocha';
import sinon, { createSandbox } from 'sinon';
import { expect } from 'chai';
import HTTPTransport, { queryStringify } from './Fetch.ts';

describe('Fetch', () => {
  function fakeFormData() {
    return {
      login: 'login',
      password: 'password',
    };
  }

  let http, request;
  const timeout = 1234;
  const sandbox = createSandbox();

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox.stub(http, 'request')
      .callsFake(() => Promise.resolve() as Promise<any>);
  });

  it('should convert query formData object into string', () => {
    const str = '?login=login&password=password';
    const data = fakeFormData();
    expect(queryStringify(data)).to.equal(str);
  });

  it('should get method', async () => {
    const data = { hello: 'world' };
    const headers = { 'Content-Type': 'application/json' };
    await http.post(
      'https://ya-praktikum.tech/api/v2/test',
      { data, headers, timeout },
    );

    expect(request.args[0]).to.be.deep.equal([
      'https://ya-praktikum.tech/api/v2/test',
      {
        data, timeout, headers, method: 'POST',
      },
      timeout]);
  });
});
