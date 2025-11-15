import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import articleReducer from "./slices/articleSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
  },
});

export default store
