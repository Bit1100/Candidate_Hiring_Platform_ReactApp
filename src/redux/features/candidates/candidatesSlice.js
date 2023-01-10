import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: "",
  candidates: [],
  error: "",
  candidate: {},
};

// Action Creator fetching single candidate
export const fetchCandidateById = createAsyncThunk(
  "candidates/fetchCandidateById",
  (id) => {
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
  extraReducers: (builder) => {
    builder.addCase(fetchCandidates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCandidates.fulfilled, (state, action) => {
      state.loading = false;
      state.candidates = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCandidates.rejected, (state, action) => {
      state.loading = false;
      state.candidates = [];
      state.error = action.payload.message;
    });
    builder.addCase(fetchCandidateById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCandidateById.fulfilled, (state, action) => {
      state.loading = false;
      state.candidate = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCandidateById.rejected, (state, action) => {
      state.loading = false;
      state.candidate = {};
      state.error = action.payload.message;
    });
  },
});

export default candidatesSlice.reducer;
