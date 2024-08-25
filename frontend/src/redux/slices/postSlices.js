import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

//Create Post action
export const redirectAfterPostCreation = createAction("redirect/AfterCreation");
export const redirectAfterPostUpdated = createAction("redirect/AfterUpdated");
export const redirectAfterPostDeleted = createAction("redirect/AfterDeleted");
//Create
export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    
    try {
      //http call
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);
      
      const { data } = await axios.post(
        `${baseURL}/api/post/create-post`,
        formData,
        config
      );
      console.log(data)
      dispatch(redirectAfterPostCreation());
      return data;
    } catch (error) {
      console.log(error)
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ====== Update a post =======

export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.put(
        `${baseURL}/api/post/${post?.id}`,
        post,
        config
      );
      dispatch(redirectAfterPostUpdated())
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//  ===== DeletePost
export const deletePostAction = createAsyncThunk(
  "post/delete",
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
        `${baseURL}/api/post/${postId}`,
        config
      );
      dispatch(redirectAfterPostDeleted())
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ---------- Fetch all posts action----------

export const fetchAllPostAction = createAsyncThunk(
  "post/fetchAll",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/api/post/?category=${category}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.message);
    }
  }
);

// ======= Fetch Single Post Detail ========
export const fetchPostDetailsAction = createAsyncThunk(
  "post/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/api/post/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.message);
    }
  }
);

// ============== Toggle like a post =======

export const togglePostLike = createAsyncThunk("post/like", async(postId, {rejectWithValue, getState, dispatch})=> {
  //get user token
  const user = getState()?.user;

  const { auth } = user;
  const config = {
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },
  };
  try {
    const { data } = await axios.put(`${baseURL}/api/post/likes/`, {postId}, config);
    return data;
  } catch (error) {

    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.message);
  }
})
export const togglePostDisLike = createAsyncThunk("post/disLike", async(postId, {rejectWithValue, getState, dispatch})=> {
  //get user token
  const user = getState()?.user;

  const { auth } = user;
  const config = {
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },
  };
  try {
    const { data } = await axios.put(`${baseURL}/api/post/dislikes/`, {postId}, config);
    return data;
  } catch (error) {

    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.message);
  }
})
//===========slice =================

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    //create post
    builder.addCase(createpostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(redirectAfterPostCreation, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.isCreated = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(redirectAfterPostUpdated, (state, action)=> {
      state.isUpdated=true;
    })
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.isUpdated = false
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //Delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(redirectAfterPostDeleted, (state, action)=> {
      state.isDeleted=true;
    })
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.postDeleted = action?.payload;
      state.isDeleted = false
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //get all posts
    builder.addCase(fetchAllPostAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(fetchAllPostAction.fulfilled, (state, action) => {
      state.postLists = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Single post Details
    
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

// post likes
    builder.addCase(togglePostLike.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(togglePostLike.fulfilled, (state, action) => {
      state.postLikes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(togglePostLike.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(togglePostDisLike.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(togglePostDisLike.fulfilled, (state, action) => {
      state.postDislikes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(togglePostDisLike.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
export default postSlice.reducer;
