import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

export const enumeratefetchAllUserAction = createAsyncThunk(
    "post/fetchAll",
    async (query, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${baseURL}/api/enumerate/users?camp=${query}`);
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.message);
      }
    }
  );


  //===========slice =================

const enumerateSlice = createSlice({
    name: "enumerate",
    initialState: {},
    extraReducers: (builder) => {
      //create post
      builder.addCase(enumeratefetchAllUserAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(enumeratefetchAllUserAction.fulfilled, (state, action) => {
        state.enumerates = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(enumeratefetchAllUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
    }
})

export default enumerateSlice.reducer;