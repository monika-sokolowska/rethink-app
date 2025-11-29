import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllUsersThunk,
  updateUserNameThunk,
  updateUserPasswordThunk,
} from "./usersThunk";

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

export const updateUserName = createAsyncThunk(
  "users/updateUserName",
  async (data, thunkAPI) => {
    const result = await updateUserNameThunk(
      `/user/update-name`,
      data,
      thunkAPI
    );
    thunkAPI.dispatch(getAllUsers());
    return result;
  }
);

export const updateUserPassword = createAsyncThunk(
  "users/updateUserPassword",
  async (data, thunkAPI) => {
    const result = await updateUserPasswordThunk(
      `/user/update-password`,
      data,
      thunkAPI
    );
    return result;
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
      })
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserName.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Name updated successfully");
      })
      .addCase(updateUserName.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Password updated successfully");
      })
      .addCase(updateUserPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default usersSlice.reducer;
