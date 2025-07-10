import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $serverApi } from '../../../api';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const exchangeCodeForToken = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('auth/exchangeCodeForToken', async (code, thunkAPI) => {
  try {
    const { data } = await $serverApi.post('/auth/github', {
      code,
    });
    const { access_token } = data;

    localStorage.setItem('access_token', access_token);

    return access_token;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при получении токена');
  }
});

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('access_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exchangeCodeForToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exchangeCodeForToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(exchangeCodeForToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export const { logout } = authSlice.actions;
