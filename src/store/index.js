import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import toDoSlice from "../slices/toDoSlice";

// Initial Store configuration for connecting redux-toolkit
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toDo: toDoSlice.reducer,
    
  },
});



export default store;
