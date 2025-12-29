import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getFootprintThunk,
  addFootprintThunk,
  removeFootprintThunk,
} from "./dailyFootprintThunk";
import { getStats } from "./statsSlice";

const initialState = {
  isLoading: false,
  transport: [],
  food: [],
  other: [],
  compensated: [],
};

export const getTransportFootprint = createAsyncThunk(
  "user/getTransportFootprint",
  async (_, thunkAPI) => {
    return getFootprintThunk(`/footprint/transport`, thunkAPI);
  }
);

export const getFoodFootprint = createAsyncThunk(
  "user/getFoodFootprint",
  async (_, thunkAPI) => {
    return getFootprintThunk(`/footprint/food`, thunkAPI);
  }
);

export const getOtherFootprint = createAsyncThunk(
  "user/getOtherFootprint",
  async (_, thunkAPI) => {
    return getFootprintThunk(`/footprint/other`, thunkAPI);
  }
);

export const getCompensatedFootprint = createAsyncThunk(
  "user/getCompensatedFootprint",
  async (_, thunkAPI) => {
    return getFootprintThunk(`/footprint/compensated`, thunkAPI);
  }
);

export const addTransportFootprint = createAsyncThunk(
  "user/addTransportFootprint",
  async (footprint, thunkAPI) => {
    const result = await addFootprintThunk(
      `/footprint/add/transport`,
      footprint
    );
    thunkAPI.dispatch(getTransportFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

export const addFoodFootprint = createAsyncThunk(
  "user/addFoodFootprint",
  async (footprint, thunkAPI) => {
    const result = await addFootprintThunk(`/footprint/add/food`, footprint);
    thunkAPI.dispatch(getFoodFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

export const addOtherFootprint = createAsyncThunk(
  "user/addOtherFootprint",
  async (footprint, thunkAPI) => {
    const result = await addFootprintThunk(`/footprint/add/other`, footprint);
    thunkAPI.dispatch(getOtherFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

export const addCompensatedFootprint = createAsyncThunk(
  "user/addCompensatedFootprint",
  async (footprint, thunkAPI) => {
    const result = await addFootprintThunk(
      `/footprint/add/compensated`,
      footprint
    );
    thunkAPI.dispatch(getCompensatedFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

export const deleteTransportFootprint = createAsyncThunk(
  "user/deleteTransportFootprint",
  async (payload, thunkAPI) => {
    const id = typeof payload === "object" ? payload.id : payload;
    const result = await removeFootprintThunk(
      `/footprint/remove/transport`,
      id
    );
    thunkAPI.dispatch(getTransportFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

export const deleteFoodFootprint = createAsyncThunk(
  "user/deleteFoodFootprint",
  async (payload, thunkAPI) => {
    const id = typeof payload === "object" ? payload.id : payload;
    const result = await removeFootprintThunk(`/footprint/remove/food`, id);
    thunkAPI.dispatch(getFoodFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

export const deleteOtherFootprint = createAsyncThunk(
  "user/deleteOtherFootprint",
  async (payload, thunkAPI) => {
    const id = typeof payload === "object" ? payload.id : payload;
    const result = await removeFootprintThunk(`/footprint/remove/other`, id);
    thunkAPI.dispatch(getOtherFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

export const deleteCompensatedFootprint = createAsyncThunk(
  "user/deleteCompensatedFootprint",
  async (payload, thunkAPI) => {
    const id = typeof payload === "object" ? payload.id : payload;
    const result = await removeFootprintThunk(
      `/footprint/remove/compensated`,
      id
    );
    thunkAPI.dispatch(getCompensatedFootprint());
    thunkAPI.dispatch(getStats());
    return result;
  }
);

const dailyFootprintSlice = createSlice({
  name: "dailyFootprint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransportFootprint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransportFootprint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const transport = payload;
        state.transport = transport;
      })
      .addCase(getTransportFootprint.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getFoodFootprint.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getFoodFootprint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const food = payload;
        state.food = food;
      })
      .addCase(getFoodFootprint.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getOtherFootprint.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getOtherFootprint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const other = payload;
        state.other = other;
      })
      .addCase(getOtherFootprint.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getCompensatedFootprint.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCompensatedFootprint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const compensated = payload;
        state.compensated = compensated;
      })
      .addCase(getCompensatedFootprint.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default dailyFootprintSlice.reducer;
