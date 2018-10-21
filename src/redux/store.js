import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Axios from 'axios';
import promise from 'redux-promise-middleware';

const reduxStore = () => {
  //state
  const stateUser = {
    fetching: false,
    fetched: true,
    users: [],
    error: ''
  };

  //action
  const userName = (state = stateUser, action) => {
    switch (action.type) {
      case 'FETCH_USERS_PENDING': {
        return { ...state, fetching: true };
      }
      case 'FETCH_USERS_FULFILLED': {
        return {
          ...state,
          users: action.payload,
          fetching: false,
          fetched: true
        };
      }
      case 'FETCH_USERS_REJECTED': {
        return { ...state, fetching: false, error: action.payload };
      }
    }
    return state;
  };

  //mengcombine reducer
  const reducer = combineReducers({
    userName
  });

  //memanagement state
  const middleware = applyMiddleware(logger, thunk, promise());

  //create store
  const store = createStore(reducer, middleware);

  //pemanggilan action
  store.dispatch({
    type: 'FETCH_USERS',
    payload: Axios.get('https://jsonplaceholder.typicode.com/users')
  });

  //component mana saja yag berlangganan
  store.subscribe(() => {
    console.log('store change', store.getState(stateUser));
  });
};

export default reduxStore;
