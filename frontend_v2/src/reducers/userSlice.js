import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  addTokenToLocalStorage,
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
  removeUserFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../utils/localStorage";
import {
  loginUserThunk,
  clearStoreThunk,
  changeMainGoalThunk,
  getUserThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  token: getTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
  registered: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    const result = await loginUserThunk("/user/login", user, thunkAPI);
    thunkAPI.dispatch(getUserAfterLogin());
    return result;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, thunkAPI) => {
    const result = await loginUserThunk("/user/register", data, thunkAPI);
    return result;
  }
);

export const loginUserFlow = createAsyncThunk(
  "user/loginUserFlow",
  async (user, thunkAPI) => {
    const result = await thunkAPI.dispatch(loginUser(user));
    thunkAPI.dispatch(getUserAfterLogin());
    return result;
  }
);

export const changeMainGoal = createAsyncThunk(
  "user/changeMainGoal",
  async (data, thunkAPI) => {
    const { goal } = data;
    const result = await changeMainGoalThunk(`/user/goal/change`, goal);
    thunkAPI.dispatch(getUser());
    return result;
  }
);

export const getUser = createAsyncThunk("user/getUser", async (_) => {
  return getUserThunk(`/user/get`);
});

const getUserAfterLogin = createAsyncThunk(
  "user/getUserAfterLogin",
  async (thunkAPI) => {
    return getUserThunk(`/user/get`);
  }
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const token = payload;
        state.isLoading = false;
        state.token = token;
        addTokenToLocalStorage(token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getUserAfterLogin.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome ${user.name}`);
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.registered = true;
        toast.success(`You are registered! You can now log in.`);
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
