import rootSaga from '../Sagas/index';
import {combineReducers} from 'redux-immutable';
import configureStore from './CreateStore';

export const reducers = combineReducers({
  itunes: require('./ItunesRedux').reducer,
});

export default () => {
  let finalReducers = reducers;

  let {store, sagasManager, sagaMiddleware} = configureStore(
    finalReducers,
    rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
