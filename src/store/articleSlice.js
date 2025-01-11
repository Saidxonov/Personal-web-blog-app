import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload.articles;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setLoading, setArticles, setPage } = articlesSlice.actions;
export default articlesSlice.reducer;
