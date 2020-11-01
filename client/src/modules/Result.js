import { createAction, handleActions } from 'redux-actions';

const RESULT = 'result';

export const Result = createAction(RESULT);

const initialState = {
  Result: {},
};

export default handleActions(
  {
    [RESULT]: (state, action) => ({
      Result: action.payload,
    }),
  },
  initialState,
);
