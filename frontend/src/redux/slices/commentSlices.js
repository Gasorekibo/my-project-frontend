import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

export const createCommentAction = createAsyncThunk("comment/create",async(comment, { rejectWithValue, getState, dispatch })=> {
    //get user token
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    // Api call
    try {
        const {data} = await axios.post(`${baseURL}/api/comment`,{
            description:comment.description,
            postId:comment.postId
        }, config)
        return data
    } catch (error) {
        if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
})
// ======= Get comments of single post

export const commentsForSinglePostAction = createAsyncThunk("comment/all", async(postId,{rejectWithValue, getState, dispatch})=> {
   //get user token
   const user = getState()?.user;

   const { auth } = user;
   const config = {
     headers: {
       Authorization: `Bearer ${auth?.token}`,
     },
   };
   // Api call
   try {
       const {data} = await axios.get(`${baseURL}/api/comment/${postId}`,config)
       return data
   } catch (error) {
       if (!error?.response) throw error;
     return rejectWithValue(error?.response?.data);
   } 
})
const commentSlice = createSlice({
    name: "comment",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(createCommentAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCommentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.commentCreated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.payload?.message;
        })
        // All Comment for single post

        builder.addCase(commentsForSinglePostAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(commentsForSinglePostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(commentsForSinglePostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.payload?.message;
        })
    }
})

export default commentSlice.reducer;