import { combineReducers } from 'redux';
import searchList from './searchList';
import Law from './Law';
import searchWord from './searchWord';
import Related from './Related';
import Result from './Result';

export default combineReducers({
  searchList,
  searchWord,
  Law,
  Related,
  Result,
});
