import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IRepository } from '../../../types/repositories.interface';
import { $githubApi } from '../../../api';

interface IGetUserRepositories {
  username: string;
  page: number;
}

export const getUserRepositories = createAsyncThunk<
  IRepository[],
  IGetUserRepositories
>('users/getUserRepositories', async ({ username, page }, thunkAPI) => {
  try {
    const token = localStorage.getItem('access_token');
    const { data } = await $githubApi.get(`/users/${username}/repos`, {
      params: {
        page,
        per_page: 30,
        sort: 'updated',
        direction: 'desc',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при загрузке репозиториев');
  }
});

interface IInitialState {
  repos: IRepository[];
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: IInitialState = {
  repos: [],
  loading: false,
  error: null,
  page: 1,
};

export const userRepositoriesSlice = createSlice({
  name: 'userRepositoriesSlice',
  initialState,
  reducers: {
    setRepoPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(getUserRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRepoPage } = userRepositoriesSlice.actions;
