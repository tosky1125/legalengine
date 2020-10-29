import { combineReducers } from 'redux';
import searchlist from './searchlist';
import Law from './Law';
import searchword from './searchword';
import searchdate from './searchdate';
import Related from './Related';
import Result from './Result';

export default combineReducers({
  searchlist,
  searchword,
  searchdate,
  Law,
  Related,
  Result,
});
