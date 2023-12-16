import { beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import Block from './Block';

describe('Block', () => {
  let block: Block;

  beforeEach(() => {
    block = new Block({});
  });

  it('should set and store the props', () => {
    block.setProps({
      test: 'test',
    });

    const { state } = block.props;
    expect(state).to.have.property('test', 'test');
  });
});
