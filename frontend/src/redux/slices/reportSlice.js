import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";


export const redirectAfterReportCreation = createAction("redirect/AfterCreation");

export const createReportAction = createAsyncThunk(
    "report/created",
    async (report, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.user;
  
      const { auth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      };
      try {
        //http call
        const formData = new FormData();
        formData.append("title", report?.title);
        formData.append("description", report?.description);
        formData.append("chw", report?.chw);
        formData.append("image", report?.image);
        const { data } = await axios.post(
          `${baseURL}/api/report/add`,
          formData,
          config
        );
        dispatch(redirectAfterReportCreation())
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );
// ======= Get All reports for a specific chw ========

export const getAllReportAction = createAsyncThunk(
  "report/all",
  async (userId,{rejectWithValue, getState, dispatch }) => {
    //get user token
    try {
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer  ${auth?.token}`,
      },
    };
      //http call
      const { data } = await axios.get(`${baseURL}/api/report/${userId}`, config);
      
      return data;
    } catch (error) {
      console.log(error);
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//  ===== Fetch single report =======

export const getSingleReportAction = createAsyncThunk(
  "report/single",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.get(
        `${baseURL}/api/report/single/rpt?i=${postId}`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//  === Forward Report to Admin ======

export const forwardToAdminAction = createAsyncThunk(
  "report/forward",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.get(
        `${baseURL}/api/report/?id=${postId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//  === Get All Forward Report to Admin ======

export const getAllForwaredReportAction = createAsyncThunk(
  "report/getForwarded",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.get(
        `${baseURL}/api/report/all/forwarded`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//  === Delete a Report ======

export const deleteReportAction = createAsyncThunk(
  "report/delete",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.delete(
        `${baseURL}/api/report/${postId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


  //===========slice =================

const reportSlice = createSlice({
    name: "report",
    initialState: {},
    extraReducers: (builder) => {
      //create post
      builder.addCase(createReportAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(redirectAfterReportCreation, (state, action) => {
        state.isCreated = true;
      });

      builder.addCase(createReportAction.fulfilled, (state, action) => {
        state.reportCreated = action?.payload;
        state.isCreated = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(createReportAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      //Get all report
      builder.addCase(getAllReportAction.pending, (state, action) => {
        state.loading = true;
      });

      builder.addCase(getAllReportAction.fulfilled, (state, action) => {
        state.reports = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getAllReportAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      //Get single report
      builder.addCase(getSingleReportAction.pending, (state, action) => {
        state.loading = true;
      });

      builder.addCase(getSingleReportAction.fulfilled, (state, action) => {
        state.report = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getSingleReportAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      //Forwarded Report
      builder.addCase(forwardToAdminAction.pending, (state, action) => {
        state.loading = true;
      });

      builder.addCase(forwardToAdminAction.fulfilled, (state, action) => {
        state.forwarded = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(forwardToAdminAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      // Get all Forwarded Reports
      builder.addCase(getAllForwaredReportAction.pending, (state, action) => {
        state.loading = true;
      });

      builder.addCase(getAllForwaredReportAction.fulfilled, (state, action) => {
        state.allForwarded = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getAllForwaredReportAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
      // Delete Report
      builder.addCase(deleteReportAction.pending, (state, action) => {
        state.loading = true;
      });

      builder.addCase(deleteReportAction.fulfilled, (state, action) => {
        state.reportDeleted = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deleteReportAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
    },
      
})

export default reportSlice.reducer;