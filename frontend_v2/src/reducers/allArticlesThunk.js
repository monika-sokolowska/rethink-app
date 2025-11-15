import customFetch from "../utils/axios";

export const getAllArticlesThunk = async (_, thunkAPI) => {
  let url = `/article/all`;
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const addArticleThunk = async (url, article) => {
  try {
    const resp = await customFetch.post(url, article);
    return resp.data;
  } catch (error) {}
};
