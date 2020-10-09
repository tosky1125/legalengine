import { createAction, handleActions } from 'redux-actions';

const SEARCHLIST = 'searchlist';

export const searchlist = createAction(SEARCHLIST);

const initialState = {
  lawlist: [],
};

export default handleActions(
  {
    [SEARCHLIST]: (state, action) => ({
      lawlist: action.payload,
    }),
  },
  initialState
);
