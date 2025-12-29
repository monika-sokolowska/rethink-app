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

export const registerAdmin = createAsyncThunk(
  "user/registerAdmin",
  async (data, thunkAPI) => {
    const result = await loginUserThunk("/user/register-admin", data, thunkAPI);
    return result;
  }
);

export const loginUserFlow = createAsyncThunk(
  "user/loginUserFlow",
  async (user, thunkAPI) => {
    const loginResult = await thunkAPI.dispatch(loginUser(user));
    // Only dispatch getUserAfterLogin if login was successful
    // The token is already saved to localStorage by the loginUser.fulfilled reducer
    if (loginUser.fulfilled.match(loginResult)) {
      // Dispatch getUserAfterLogin - token should be in localStorage now
      thunkAPI.dispatch(getUserAfterLogin());
    }
    return loginResult;
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

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  return getUserThunk(`/user/get`, thunkAPI);
});

const getUserAfterLogin = createAsyncThunk(
  "user/getUserAfterLogin",
  async (_, thunkAPI) => {
    return getUserThunk(`/user/get`, thunkAPI);
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
        if (payload) {
          toast.error(payload);
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      })
      .addCase(loginUserFlow.rejected, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          toast.error(payload);
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
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
        if (user) {
          addUserToLocalStorage(user);
          toast.success(`Welcome ${user.name || user.email || "User"}!`);
        }
      })
      .addCase(getUserAfterLogin.rejected, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          toast.error(payload);
        }
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.registered = true;
        toast.success(`You are registered! You can now log in.`);
      })
      .addCase(registerAdmin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.registered = true;
        toast.success(`Admin account created! You can now log in.`);
      })
      .addCase(registerAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Failed to create admin account");
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
