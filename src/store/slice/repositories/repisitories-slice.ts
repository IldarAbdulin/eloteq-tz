import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $githubApi } from '../../../api';
import type { IRepository } from '../../../types/repositories.interface';
import { type VisibilityType } from '../../../constants/repositories';

interface IGetRepositoriesProps {
  visibility: VisibilityType;
  page: number;
}

export const getRepositories = createAsyncThunk<
  { visibility: VisibilityType; data: IRepository[]; page: number },
  IGetRepositoriesProps
>('repo/getRepositories', async ({ visibility, page }, thunkAPI) => {
  try {
    const token = localStorage.getItem('access_token');
    const { data } = await $githubApi.get<IRepository[]>(`/user/repos`, {
      params: {
        visibility,
        page,
        per_page: 30,
        sort: 'updated',
        direction: 'desc',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { visibility, data, page };
  } catch (error) {
    return thunkAPI.rejectWithValue('Не удалось загрузить репозитории');
  }
});

interface IInitialState {
  public: IRepository[] | null;
  private: IRepository[] | null;
  loading: boolean;
  error: string | null;
  hasMore: { public: boolean; private: boolean };
}

const initialState: IInitialState = {
  public: null,
  private: null,
  loading: false,
  error: null,
  hasMore: { public: true, private: true },
};

export const repositoriesSlice = createSlice({
  name: 'repositoriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRepositories.fulfilled, (state, action) => {
        const { visibility, data } = action.payload;

        state.loading = false;
        state[visibility] = data;

        state.hasMore[visibility] = data.length === 30;
      })
      .addCase(getRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
