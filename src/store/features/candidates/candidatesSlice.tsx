import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  candidatesState,
  candidateState,
  candidatesDetailState,
} from "../../../types";

const initialState: candidatesState = {
  loading: false,
  candidates: [],
  error: "",
  candidate: Object.create({}),
};

// Action Creator fetching single candidate
export const fetchCandidateById = createAsyncThunk(
  "candidates/fetchCandidateById",
  (id: number) => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        const user = response.data;

        user["address"] = user.address.city;
        user["company"] = user.company.name;

        return user;
      });
  }
);

// Action Creator fetching candidates
export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.data);
  }
);

// Handling the respnse of async action creators
export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCandidates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCandidates.fulfilled,
      (state, action: PayloadAction<candidateState[]>) => {
        state.loading = false;
        state.candidates = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchCandidates.rejected, (state, action) => {
      state.loading = false;
      state.candidates = [];
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(fetchCandidateById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCandidateById.fulfilled,
      (state, action: PayloadAction<candidatesDetailState>) => {
        state.loading = false;
        state.candidate = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchCandidateById.rejected, (state, action) => {
      state.loading = false;
      state.candidate = Object.create({});
      state.error = action.error.message || "Something Went Wrong";
    });
  },
});

export default candidatesSlice.reducer;
