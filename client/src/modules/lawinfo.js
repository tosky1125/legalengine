import { createAction, handleActions } from 'redux-actions';

const LAWINFO = 'lawinfo';

export const lawinfo = createAction(LAWINFO);

const initialState = {
  lawinfo: {},
};

export default handleActions(
  {
    [LAWINFO]: (state, action) => ({
      lawinfo: action.payload,
    }),
  },
  initialState
);
