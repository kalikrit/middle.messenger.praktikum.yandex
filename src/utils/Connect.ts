import Block from './Block.ts';
import store, { StoreEvents } from './Store.ts';
import { isEqual } from './Utils.ts';
import { Indexed } from '../types/types.ts';

type IProps = Record<string, any>;

function connect(mapStateToProps: (state: Indexed) => Record<string, any>) {
  return function Foo(Block1: typeof Block) {
    return class extends Block1 {
      constructor(props: IProps, children?: Record<string, any>) {
        let state = mapStateToProps(store.getState());

        super({ ...props, state }, children);

        // Подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps(newState);
          }

          state = newState;
        });
      }
    };
  };
}

export default connect;
