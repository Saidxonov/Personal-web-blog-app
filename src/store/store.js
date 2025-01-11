import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articleSlice.js";
const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export default store;
