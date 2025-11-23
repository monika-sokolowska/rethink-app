import customFetch from "../utils/axios";

export const getAllUsersThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/user/all");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch users"
    );
  }
};

export const updateUserNameThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update user name"
    );
  }
};

