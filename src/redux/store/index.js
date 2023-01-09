import { configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "../features/candidates/candidatesSlice";

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
});
