import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slice/auth/auth-slice';
import { userProfileSlice } from './slice/profile/profile-slice';
import { repositoriesSlice } from './slice/repositories/repisitories-slice';
import { usersSlice } from './slice/users/users-slice';
import { userSlice } from './slice/users/user-detail-slice';
import { userRepositoriesSlice } from './slice/users/user-repos-slice';

const reducers = combineReducers({
  auth: authSlice.reducer,
  userProfile: userProfileSlice.reducer,
  repositories: repositoriesSlice.reducer,
  users: usersSlice.reducer,
  userDetail: userSlice.reducer,
  userRepositories: userRepositoriesSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.MODE === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
