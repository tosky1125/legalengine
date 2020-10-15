import { createAction, handleActions } from 'redux-actions';

const LAWINFO = 'lawinfo';

export const lawinfo = createAction(LAWINFO);

const initialState = {
  lawDetail: {},
};

export default handleActions(
  {
    [LAWINFO]: (state, action) => ({
      lawDetail: action.payload,
    }),
  },
  initialState
);
