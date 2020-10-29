import { createAction, handleActions } from 'redux-actions';

const SEARCHWORD = 'searchword';

export const searchword = createAction(SEARCHWORD);

const initialState = {
  searchword: null,
};

export default handleActions(
  {
    [SEARCHWORD]: (state, action) => ({
      searchword: action.payload,
    }),
  },
  initialState
);
