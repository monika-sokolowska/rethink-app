import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getStatsThunk, updateAverageDailyFootprintThunk } from "./statsThunk";

const initialState = {
  isLoading: false,
  stats: {},
  averagePerson: null,
};

export const getStats = createAsyncThunk(
  "user/getStats",
  async (_, thunkAPI) => {
    return getStatsThunk(`/stats/daily`, thunkAPI);
  }
);

export const getAveragePerson = createAsyncThunk(
  "stats/getAveragePerson",
  async (_, thunkAPI) => {
    return getStatsThunk(`/stats/average-person`, thunkAPI);
  }
);

export const updateAverageDailyFootprint = createAsyncThunk(
  "stats/updateAverageDailyFootprint",
  async (data, thunkAPI) => {
    const result = await updateAverageDailyFootprintThunk(
      `/stats/average-daily-footprint`,
      data,
      thunkAPI
    );
    thunkAPI.dispatch(getAveragePerson());
    return result;
  }
);

const statsSlice = createSlice({
  name: "dailyFootprint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const stats = payload;
        state.stats = stats;
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAveragePerson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAveragePerson.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.averagePerson = payload;
      })
      .addCase(getAveragePerson.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateAverageDailyFootprint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAverageDailyFootprint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.averagePerson = payload;
        toast.success("Average daily footprint updated successfully");
      })
      .addCase(updateAverageDailyFootprint.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default statsSlice.reducer;
