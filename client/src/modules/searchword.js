import { createAction, handleActions } from 'redux-actions';

const SEARCHWORD = 'searchword';

export const searchword = createAction(SEARCHWORD);

const initialState = {
  searchTerm: '',
};

export default handleActions(
  {
    [SEARCHWORD]: (state, action) => ({
      searchTerm: action.payload,
    }),
  },
  initialState
);
