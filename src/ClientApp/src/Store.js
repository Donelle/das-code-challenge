import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import COActionTypes from './ActionTypes'

export default function configureStore(initialState) {

  const middleware = [ ];
  const enhancers = [];

  // In development, use the browser's Redux dev tools extension if installed
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
    const { logger } = require('redux-logger');
    middleware.push(logger);
  }

  const rootReducer = combineReducers({
    /*...reducers, */
    app: AppReducer,
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
  
}

const AppReducer = 
  (state = { loading: false, coins:[] }, action) => {
    switch (action.type) {
      case COActionTypes.Optimize:
        return {
          ...state,
          loading: true
        }

      case COActionTypes.Reset:
        return {
          ...state,
          loading: false,
          coins: []
        }

      case COActionTypes.Completed:
        return {
          ...state,
          loading: false,
          coins : action.coins ? 
              action.coins.map(r => {
                return {
                  key: r.name,
                  image: r.name.toLowerCase() + '.jpeg',
                  count: r.quantity
                }
              }) : []
        }
        
        default:
          return state;

    }
  }