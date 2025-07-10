import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUserProfile } from '../../../types/profile.interface';
import { $githubApi } from '../../../api';

interface IGetUsersProps {
  query: string;
  page: number;
}

export const getUsers = createAsyncThunk<
  {
    users: IUserProfile[];
    totalCount: number;
  },
  IGetUsersProps
>('users/getUsers', async ({ page, query }, thunkAPI) => {
  if (!query.trim()) {
    return { users: [], totalCount: 0 };
  }
  try {
    const token = localStorage.getItem('access_token');
    const { data } = await $githubApi.get(`/search/users`, {
      params: {
        q: query,
        page,
        per_page: 10,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      users: data.items,
      totalCount: data.total_count,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при поиске пользователей');
  }
});

interface IInitialState {
  query: string;
  page: number;
  users: IUserProfile[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  query: '',
  page: 1,
  users: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearUsers(state) {
      state.users = [];
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, setPage, clearUsers } = usersSlice.actions;
