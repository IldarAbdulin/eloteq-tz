import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUserProfile } from '../../../types/profile.interface';
import { $githubApi } from '../../../api';

interface IGetUser {
  username: string;
}

export const getUser = createAsyncThunk<IUserProfile, IGetUser>(
  'users/getUser',
  async ({ username }, thunkAPI) => {
    try {
      const token = localStorage.getItem('eloteq_tz_access_token');
      const { data } = await $githubApi.get(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при получении пользователя');
    }
  }
);

interface IInitialState {
  user: IUserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
