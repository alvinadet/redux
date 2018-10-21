import { createStore, combineReducers } from 'redux';

const reduxStore = () => {
  const stateUser = {
    name: 'Alvin'
  };
  const userName = (state = stateUser, action) => {
    switch (action.type) {
      case 'CHANGE_NAME': {
        state = { ...state, name: action.payload };
        break;
      }
      case 'CHANGE_AGE': {
        state = { ...state, age: action.payload };
        break;
      }
      default: {
        return state;
      }
    }
    return state;
  };

  const reducer = combineReducers({
    user: userName
  });

  const tweetsAction = () => {};

  const store = createStore(reducer);

  store.subscribe(() => {
    console.log('store change', store.getState());
  });

  store.dispatch({ type: 'CHANGE_NAME', payload: 'ALVIN' });
  store.dispatch({ type: 'CHANGE_AGE', payload: 18 });
  store.dispatch({ type: 'CHANGE_NAME', payload: 'ADETYA' });
};

export default reduxStore;
