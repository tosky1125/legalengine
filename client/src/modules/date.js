import { createAction, handleActions } from 'redux-actions';

const DATE = 'date';

export const date = createAction(DATE);

const initialState = {
  date: '',
};

export default handleActions(
  {
    [DATE]: (state, action) => ({
      date: action.payload,
    }),
  },
  initialState
);
