import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      const { password: _password, ...userWithoutPassword } = user;

      state.user = userWithoutPassword;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      if (!state.user) return;

      if (typeof action.payload === "string") {
        state.user.name = action.payload;
      } else {
        const { password: _password, ...safeData } = action.payload;
        state.user = { ...state.user, ...safeData };
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
