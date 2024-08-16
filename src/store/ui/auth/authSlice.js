import { createSlice } from '@reduxjs/toolkit';
import { authStatusType } from './../../../auth/';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: authStatusType.cheking,
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onCheckingCredentials: (state /* action */) => {
      state.status = authStatusType.cheking;
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = authStatusType.authenticated;
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogouth: (state, { payload }) => {
      state.status = authStatusType.notAuthenticated;
      state.user = {};
      state.errorMessage = payload;
    },
    clearerrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCheckingCredentials, onLogin, onLogouth, clearerrorMessage } =
  authSlice.actions;
