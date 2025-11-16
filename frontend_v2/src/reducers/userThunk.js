import customFetch from "../utils/axios";
import { logoutUser } from "./userSlice";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || error.response?.data?.message || "Login failed. Please check your credentials.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const registerUserThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

export const changeMainGoalThunk = async (url, goal) => {
  try {
    const resp = await customFetch.patch(url, goal);
    return resp.data;
  } catch (error) {}
};

export const getUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    if (thunkAPI) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
    return null;
  }
};
