import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getStatsThunk } from "./statsThunk";

const initialState = {
  isLoading: false,
  stats: {},
};

export const getStats = createAsyncThunk(
  "user/getHouseholdFootprint",
  async (userId) => {
    return getStatsThunk(`/stats/daily`, userId);
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
      });
  },
});

export default statsSlice.reducer;
