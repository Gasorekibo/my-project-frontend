import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import categoryReducer from "../slices/categorySlice";
import postReducer from "../slices/postSlices";
import reportReducer from "../slices/reportSlice"
import commentReducer from "../slices/commentSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    post: postReducer,
    comment:commentReducer,
    report: reportReducer,
  },
});
