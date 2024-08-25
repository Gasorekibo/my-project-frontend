import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
// ------- create a Register actionType using asyncthunk ------

export const registerUserAction = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //   -------- Call backend api -------
      const response = await axios.post(
        `${baseURL}/api/users/register`,
        user,
        config
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

// ---------- Create a login action type using asynchthunk --------

export const loginUserActionType = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/users/login`,
        userData,
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
// ----------Get all CHW using asynchthunk --------

export const getAllChw = createAsyncThunk(
  "user/chw",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseURL}/api/users/all/chw`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
// ---------- Follow user --------

export const followUser = createAsyncThunk(
  "user/follow",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/users/follow`,
        id,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
// ---------- Unollow user --------

export const unFollowUserAction = createAsyncThunk(
  "user/unfollow",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/users/unFollow`,
        id,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
// ==== get all users ===
export const getAllUsers = createAsyncThunk(
  "user/all",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseURL}/api/users`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);


// --------------- User profile --------
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseURL}/api/users/${userId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
// --------------- Change to Blogger --------
export const changeToChwAction = createAsyncThunk(
  "user/changeTochw",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;

      if (!user?.auth?.token) {
        return rejectWithValue("Token is missing");
      }
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/users/${userId}`,
        null,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
// --------------- Delete User --------
export const deleteUserAction = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;

      if (!user?.auth?.token) {
        return rejectWithValue("Token is missing");
      }
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseURL}/api/users/${userId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

// ------------------ User logout action --------

export const logoutUserAction = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ----- get the user from localStorage -------

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// ----------- Create a user slice ------

const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: userFromLocalStorage,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.auth = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== All Chw ======
    builder.addCase(getAllChw.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getAllChw.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getAllChw.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== Follow User ======
    builder.addCase(followUser.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userFollowed = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== Unfollow User ======
    builder.addCase(unFollowUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUnfollowed = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(unFollowUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== Change user to chw======
    builder.addCase(changeToChwAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(changeToChwAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userChanged = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(changeToChwAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== Delete a single user======
    builder.addCase(deleteUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userChanged = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== All Users ======
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // reducers for login user.
    builder.addCase(loginUserActionType.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserActionType.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action?.payload;
      state.userAuth = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserActionType.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
    //  user profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppError = undefined;
      state.profileServerError = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profile = action?.payload;
      state.profileAppError = undefined;
      state.profileServerError = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });

    // User logout Reducer
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = undefined;
      state.userAuth = undefined;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
  },
});

export default userSlice.reducer;
