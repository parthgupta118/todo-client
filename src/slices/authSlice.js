import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router";

// Configured Initial Auth State
const initialAuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: JSON.parse(sessionStorage.getItem("currentLoggedIn")),
  users: JSON.parse(localStorage.getItem("all_users")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    /**
     * It will get the current logged in user data stored in localStorage.
     * @param {payload} payload - It will contain the login data
     */

    loadUser(state, { payload }) {
      state.loading = false;

      state.user = JSON.parse(sessionStorage.getItem("currentLoggedIn"));
      state.isAuthenticated = true;
    },

    /**
     * It will add the users in all_users key in sessionStorage in JSON string format.
     * @param {payload} payload - It will contain the signup data
     */
    registerUser(state, { payload }) {
      // state.token = payload;
      state.loading = false;
      state.isAuthenticated = false;
      // state.user=payload;
      state.users = [...state.users, payload];

      localStorage.setItem("all_users", JSON.stringify(state.users));

    },

    /**
     * It will add the users in all_users key in localStorage in JSON string format.
     * @param {payload} payload - It will contain the login data
     */
    loginUser(state, { payload }) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = payload;
      state.user = payload;

      sessionStorage.setItem("currentLoggedIn", JSON.stringify(payload));
    },

    /**
     * It will logout and remove currentLoggedIn Key in sessionStorage.
     */
    logout(state) {
      sessionStorage.removeItem("currentLoggedIn");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
