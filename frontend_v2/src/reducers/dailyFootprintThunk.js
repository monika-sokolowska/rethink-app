import customFetch from "../utils/axios";

export const getFootprintThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const addFootprintThunk = async (url, footprint) => {
  try {
    const resp = await customFetch.post(url, footprint);
    return resp.data;
  } catch (error) {}
};

export const removeFootprintThunk = async (url, id) => {
  try {
    const resp = await customFetch.delete(url, { data: id });
    return resp.data;
  } catch (error) {}
};
