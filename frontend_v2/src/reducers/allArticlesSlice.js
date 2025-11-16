import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllArticlesThunk, addArticleThunk, deleteArticleThunk } from "./allArticlesThunk";

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

export const deleteArticle = createAsyncThunk(
  "allArticles/deleteArticle",
  async (id, thunkAPI) => {
    const result = await deleteArticleThunk(`/article/delete`, id, thunkAPI);
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
      })
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Article deleted successfully");
      })
      .addCase(deleteArticle.rejected, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          toast.error(payload);
        }
      });
  },
});

export default allArticlesSlice.reducer;
