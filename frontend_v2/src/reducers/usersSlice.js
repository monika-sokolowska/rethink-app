import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllUsersThunk } from "./usersThunk";

const initialState = {
  isLoading: false,
  users: [],
};

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    return getAllUsersThunk(thunkAPI);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default usersSlice.reducer;

