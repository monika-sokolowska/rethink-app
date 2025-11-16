import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getHouseholdThunk, updateHouseholdThunk } from "./householdFootprintThunk";

const initialState = {
  isLoading: false,
  householdFootprint: {
    id: null,
    date: null,
    footprint: 0,
  },
};

export const getHouseholdFootprint = createAsyncThunk(
  "user/getHouseholdFootprint",
  async (_, thunkAPI) => {
    return getHouseholdThunk(`/household/get`, thunkAPI);
  }
);

export const updateHouseholdFootprint = createAsyncThunk(
  "user/updateHouseholdFootprint",
  async (footprint, thunkAPI) => {
    const result = await updateHouseholdThunk(`/household/update`, footprint, thunkAPI);
    thunkAPI.dispatch(getHouseholdFootprint());
    return result;
  }
);

const householdFootprintSlice = createSlice({
  name: "dailyFootprint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHouseholdFootprint.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getHouseholdFootprint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const householdFootprint = payload;
        state.householdFootprint = householdFootprint;
      })
      .addCase(getHouseholdFootprint.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateHouseholdFootprint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHouseholdFootprint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const householdFootprint = payload;
        state.householdFootprint = householdFootprint;
        toast.success("Household footprint updated successfully");
      })
      .addCase(updateHouseholdFootprint.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default householdFootprintSlice.reducer;
