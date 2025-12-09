import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getRecurringFootprintsThunk,
  addRecurringFootprintThunk,
  deleteRecurringFootprintThunk,
  toggleRecurringFootprintThunk,
} from "./recurringFootprintThunk";

const initialState = {
  isLoading: false,
  recurringFootprints: [],
};

export const getRecurringFootprints = createAsyncThunk(
  "recurringFootprint/getAll",
  async (_, thunkAPI) => {
    return getRecurringFootprintsThunk(thunkAPI);
  }
);

export const addRecurringFootprint = createAsyncThunk(
  "recurringFootprint/add",
  async (recurringFootprint, thunkAPI) => {
    const result = await addRecurringFootprintThunk(recurringFootprint);
    thunkAPI.dispatch(getRecurringFootprints());
    return result;
  }
);

export const deleteRecurringFootprint = createAsyncThunk(
  "recurringFootprint/delete",
  async (id, thunkAPI) => {
    const result = await deleteRecurringFootprintThunk(id);
    thunkAPI.dispatch(getRecurringFootprints());
    return result;
  }
);

export const toggleRecurringFootprint = createAsyncThunk(
  "recurringFootprint/toggle",
  async (id, thunkAPI) => {
    const result = await toggleRecurringFootprintThunk(id);
    thunkAPI.dispatch(getRecurringFootprints());
    return result;
  }
);

const recurringFootprintSlice = createSlice({
  name: "recurringFootprint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecurringFootprints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecurringFootprints.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.recurringFootprints = payload;
      })
      .addCase(getRecurringFootprints.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(addRecurringFootprint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRecurringFootprint.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Daily footprint added!");
      })
      .addCase(addRecurringFootprint.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to add daily footprint");
      })
      .addCase(deleteRecurringFootprint.fulfilled, () => {
        toast.success("Daily footprint removed!");
      })
      .addCase(toggleRecurringFootprint.fulfilled, () => {
        toast.success("Daily footprint updated!");
      });
  },
});

export default recurringFootprintSlice.reducer;

