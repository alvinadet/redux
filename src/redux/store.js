import { createStore } from 'redux';

const reduxStore = () => {
  const reducer = function(state, action) {
    return state;
  };

  const store = createStore(reducer, { name: 'alvin' });

  store.subscribe(() => {
    console.log('store change', store.getState());
  });

  store.dispatch({ type: 'INC', payload: 1 });
};

export default reduxStore;
