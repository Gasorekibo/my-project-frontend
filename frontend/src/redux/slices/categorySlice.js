import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// Create a custom action to redirect user once category created
const redirectCreateCategoryAction = createAction("/category/redirect");

// ----------- Create Category action -------

export const createCategoryAction = createAsyncThunk(
  "category/createCategory",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState()?.user?.auth?.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseURL}/api/category`,
        {
          title: category?.title,
        },
        config
      );
      dispatch(redirectCreateCategoryAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
// ------------ Get all categories Action -------

export const getAllCategoriesAction = createAsyncThunk(
  "category/fetchCategories",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState()?.user?.auth?.token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/api/category`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// ---------- Update category Action -------

export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState()?.user?.auth?.token}`,
        },
      };

      const { data } = await axios.put(
        `${baseURL}/api/category/${category?.id}`,
        { title: category?.title },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
// ---------- delete category Action -------

export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState()?.user?.auth?.token}`,
        },
      };
      const { data } = await axios.delete(
        `${baseURL}/api/category/${id}`,

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// --------------- fetch single category details --------------

export const getSingleCategoryAction = createAsyncThunk(
  "category/singleCategory",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState()?.user?.auth?.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseURL}/api/category/${id}`,

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// ==================================
// ---------- Category Slice --------
// ==================================

const categorySlice = createSlice({
  name: "category",
  initialState: { category: "" },
  extraReducers: (builder) => {
    // create category reducer
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(redirectCreateCategoryAction, (state, action) => {
      state.isCategoryCreated = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.isCategoryCreated = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
    // fetch all a categories reducer
    builder.addCase(getAllCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
      state.categories = undefined;
    });
    builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getAllCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });

    // update category reducrer

    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedcategory = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
    // delete category reducrer

    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedcategory = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
    // ----- fetch single category reducer ---

    builder.addCase(getSingleCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getSingleCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryDetails = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getSingleCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
  },
});
export default categorySlice.reducer;
