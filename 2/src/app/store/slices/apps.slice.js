import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $api } from '../../../shared/axios.js';

export const fetchApps = createAsyncThunk('apps/fetch', async () => {
  const { data } = await $api.get('apps');
  return data.apps;
});

export const fetchRemoveApp = createAsyncThunk('app/delete', async (id) => {
  await $api.delete(`app/${id}`);
});

const initialState = {
  apps: {
    items: [],
    status: 'loading',
  },
};

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(fetchApps.pending, (state) => {
        state.apps.items = [];
        state.apps.status = 'loading';
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.apps.items = action.payload;
        state.apps.status = 'loaded';
      })
      .addCase(fetchApps.rejected, (state) => {
        state.apps.items = [];
        state.apps.status = 'error';
      })

      // remove
      .addCase(fetchRemoveApp.pending, (state, action) => {
        state.apps.items = state.apps.items.filter(
          (app) => app.id !== action.meta.arg
        );
        state.apps.status = 'loading';
      });
  },
});

export const appsReducer = appsSlice.reducer;
