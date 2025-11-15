import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllArticlesThunk, addArticleThunk } from "./allArticlesThunk";

const initialState = {
  isLoading: false,
  articles: [],
};

export const getAllArticles = createAsyncThunk(
  "allArticles/getAllArticles",
  async (_, thunkAPI) => {
    return getAllArticlesThunk(thunkAPI);
  }
);

export const addArticle = createAsyncThunk(
  "allArticles/addArticle",
  async (article, thunkAPI) => {
    const result = await addArticleThunk(`/article/add`, article);

    thunkAPI.dispatch(getAllArticles());
    return result;
  }
);

const allArticlesSlice = createSlice({
  name: "allArticles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllArticles.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllArticles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.articles = payload;
      })
      .addCase(getAllArticles.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default allArticlesSlice.reducer;
