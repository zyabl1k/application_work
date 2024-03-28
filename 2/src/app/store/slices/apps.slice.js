import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  apps: {
    items: [],
    status: 'loading'
  }
}

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {

  }
});

export const appsReducer = appsSlice.reducer;