import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './features/token/tokenSlice';

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
