import { createAction, handleActions } from 'redux-actions';

const RELATED = 'Related';

export const Related = createAction(RELATED);

const initialState = {
  Related: {},
};

export default handleActions(
  {
    [RELATED]: (state, action) => ({
      Related: action.payload,
    }),
  },
  initialState,
);
