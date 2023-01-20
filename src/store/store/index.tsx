import { configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "../features/candidates/candidatesSlice";
import selectedCandidatesReducer from "../features/candidates/selectedCandidatesSlice";

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    selectedCandidates: selectedCandidatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
