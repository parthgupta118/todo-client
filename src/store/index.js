import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import postSlice from "../slices/toDoSlice";


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toDo: toDoSlice.reducer,
    
  },
});



export default store;
