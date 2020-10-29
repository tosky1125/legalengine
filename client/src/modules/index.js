import { combineReducers } from 'redux';
import searchlist from './searchlist';
import lawinfo from './lawinfo';
import searchword from './searchword';

export default combineReducers({
  searchlist,
  searchword,
  lawinfo,
});
