import { createAction, handleActions } from 'redux-actions';

const SEARCHWORD = 'searchWord';

export const searchWord = createAction(SEARCHWORD);

const initialState = {
  searchWord: '',
};

export default handleActions(
  {
    [SEARCHWORD]: (state, action) => ({
      searchWord: action.payload,
    }),
  },
  initialState,
);
