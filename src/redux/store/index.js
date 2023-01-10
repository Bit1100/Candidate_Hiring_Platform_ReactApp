import { configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "../features/candidates/candidatesSlice";
import selectedCandidatesReducer from "../features/candidates/selectedCandidatesSlice";

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    selectedCandidates: selectedCandidatesReducer,
  },
});
