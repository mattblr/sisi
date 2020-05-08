import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    userId: "",
    token: "",
    tokenExpiration: 0,
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.tokenExpiration = action.payload.tokenExpiration;
    },
    logout: (state) => {
      state.userId = "";
      state.token = "";
      state.tokenExpiration = 0;
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
