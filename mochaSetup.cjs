const { JSDOM } = require('jsdom');
const sinon = require('sinon');

const { window } = new JSDOM('<main id="main"></main>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
