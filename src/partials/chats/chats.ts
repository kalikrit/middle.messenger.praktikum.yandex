import template from './chats.hbs?raw';
import Block from '../../utils/Block';

class Chats extends Block {
  constructor() {
    super({ componentName: 'Chats' });
  }

  componentDidMount() {
    return true;
  }

  render() {
    return template;
  }
}

export default Chats;
