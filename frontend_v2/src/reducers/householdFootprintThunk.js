import customFetch from "../utils/axios";

export const getHouseholdThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch household footprint"
    );
  }
};

export const addHouseholdThunk = async (url, footprint) => {
  try {
    const resp = await customFetch.post(url, footprint);
    return resp.data;
  } catch (error) {}
};

export const updateHouseholdThunk = async (url, footprint, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, footprint);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update household footprint"
    );
  }
};
