import { createStore } from 'redux';
import modules from '../modules';

const config = () => {
  const devTools = window.REDUX_DEVTOOLS_EXTENSION
  && window.REDUX_DEVTOOLS_EXTENSION();
  const store = createStore(modules, devTools);
  return store;
};

export default config;
