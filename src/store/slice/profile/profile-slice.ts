import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { $githubApi } from '../../../api';
import type { IUserProfile } from '../../../types/profile.interface';

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('access_token');
      const { data } = await $githubApi.get<IUserProfile>('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Ошибка при получении профиля пользователя'
      );
    }
  }
);

interface IInitialState {
  userProfile: IUserProfile | null;
  loading: boolean;
  error: null | string;
}

const initialState: IInitialState = {
  userProfile: null,
  loading: false,
  error: null,
};

export const userProfileSlice = createSlice({
  name: 'userProfileSlice',
  initialState,
  reducers: {
    updateUserProfile: (
      state,
      action: PayloadAction<Partial<IUserProfile>>
    ) => {
      if (state.userProfile) {
        state.userProfile = { ...state.userProfile, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateUserProfile } = userProfileSlice.actions;
