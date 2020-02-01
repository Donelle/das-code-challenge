import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from "redux-form";

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
    form: formReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
  
}

