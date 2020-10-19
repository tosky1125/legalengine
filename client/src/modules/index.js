import { combineReducers } from 'redux';
import searchlist from './searchlist';
import lawinfo from './lawinfo';
import date from './date';

export default combineReducers({
  searchlist,
  lawinfo,
  date,
});
