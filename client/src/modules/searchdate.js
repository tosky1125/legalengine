import { createAction, handleActions } from 'redux-actions';

const SEARCHDATE = 'seachdate';

export const seachdate = createAction(SEARCHDATE);

const initialState = {
  searchDate: '',
};

export default handleActions(
  {
    [SEARCHDATE]: (state, action) => ({
      searchDate: action.payload,
    }),
  },
  initialState
);
