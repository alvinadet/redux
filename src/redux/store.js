import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Axios from 'axios';

const reduxStore = () => {
  //state
  const stateUser = {
    users: 0
  };

  //action
  const userName = (state = stateUser, action) => {
    switch (action.type) {
      case 'FETCH_USERS_START': {
        break;
      }
      case 'RECEIVE_USERS': {
        return { ...state, users: action.payload };
      }
      case 'FETCH_USERS_ERROR': {
        break;
      }
    }
    return state;
  };

  //mengcombine reducer
  const reducer = combineReducers({
    userName
  });

  //memanagement state
  const middleware = applyMiddleware(logger, thunk);

  //create store
  const store = createStore(reducer, middleware);

  //pemanggilan action
  store.dispatch(dispatch => {
    dispatch({ type: 'FETCH_USERS_START' });
    Axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        dispatch({ type: 'RECEIVE_USERS', payload: res.data });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_USERS_ERROR', payload: err.data });
      });
  });

  //component mana saja yag berlangganan
  store.subscribe(() => {
    console.log('store change', store.getState(stateUser));
  });
};

export default reduxStore;
