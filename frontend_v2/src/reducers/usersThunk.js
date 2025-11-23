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

