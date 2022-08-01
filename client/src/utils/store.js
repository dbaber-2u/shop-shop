import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './redux_state';

export const store = configureStore({
  reducer: {
    reduxState: stateReducer,
  },
});
