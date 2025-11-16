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

export const deleteArticleThunk = async (url, id, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url, {
      data: { id: id },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Delete article request error:", error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete article");
  }
};