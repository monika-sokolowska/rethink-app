import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getGoalsThunk, addGoalThunk } from "./goalsThunk";

const initialState = {
  isLoading: false,
  goals: [],
};

export const getGoals = createAsyncThunk(
  "user/getGoals",
  async (userId, thunkAPI) => {
    return getGoalsThunk(`/goal/all/${userId}`, thunkAPI);
  }
);

export const addGoal = createAsyncThunk("user/addGoal", async (data) => {
  const { userId, goal } = data;
  return addGoalThunk(`/goal/add/${userId}`, goal);
});

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const goals = payload;
        state.goals = goals;
        console.log("state.goals", state.goals);
      })
      .addCase(getGoals.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default goalsSlice.reducer;