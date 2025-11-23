import customFetch from "../utils/axios";

export const getStatsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
  }
};

export const updateAverageDailyFootprintThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update average daily footprint"
    );
  }
};