import { createAction, handleActions } from 'redux-actions';

const SEARCHLIST = 'searchList';

export const searchList = createAction(SEARCHLIST);

const initialState = {
  lawList: [],
};

export default handleActions(
  {
    [SEARCHLIST]: (state, action) => ({
      lawList: action.payload,
    }),
  },
  initialState,
);
