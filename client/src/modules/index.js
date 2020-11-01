import { combineReducers } from 'redux';
import searchList from './SearchList';
import Law from './Law';
import searchWord from './SearchWord';
import Related from './Related';
import Result from './Result';

export default combineReducers({
  searchList,
  searchWord,
  Law,
  Related,
  Result,
});
