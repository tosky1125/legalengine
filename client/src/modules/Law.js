import { createAction, handleActions } from 'redux-actions';

const LAW = 'Law';

export const Law = createAction(LAW);

const initialState = {
  Law: {},
};

export default handleActions(
  {
    [LAW]: (state, action) => ({
      Law: action.payload,
    }),
  },
  initialState
);
