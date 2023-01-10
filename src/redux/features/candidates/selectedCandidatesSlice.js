import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  candidates: [],
  totalSelected: 0,
  candidatesDetail: {
    candidates: [],
    loading: "",
    error: "",
  },
};

// Action Creator fetching single candidate and populating the selectedCandidates
export const fetchSelectedCandidatesById = createAsyncThunk(
  "candidates/fetchSelectedCandidatesById",
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

// Handling the respnse of async action creators
export const candidatesSlice = createSlice({
  name: "selectedCandidates",
  initialState,
  reducers: {
    selectCandidate: (state, action) => {
      const id = action.payload;
      const candidate = {
        id,
      };
      if (!state.candidates?.some((e) => e["id"] === id)) {
        state.candidates.push(candidate);
        state.totalSelected += 1;
      }
    },
    deleteCandidate: (state, action) => {
      const id = action.payload;
      const index = state.candidates.findIndex((obj) => obj["id"] === id);

      const sindex = state.candidatesDetail.candidates.findIndex(
        (obj) => obj["id"] === id
      );

      state.candidates?.splice(index, 1);
      state.candidatesDetail.candidates?.splice(sindex, 1);
      state.totalSelected -= 1;
      state.totalSelected < 0 && (state.totalSelected = 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSelectedCandidatesById.pending, (state) => {
      state.candidatesDetail.loading = true;
    });
    builder.addCase(fetchSelectedCandidatesById.fulfilled, (state, action) => {
      state.candidatesDetail.loading = false;
      state.candidatesDetail.candidates.push(action.payload);
      state.candidatesDetail.error = "";
    });
    builder.addCase(fetchSelectedCandidatesById.rejected, (state, action) => {
      state.candidatesDetail.loading = false;
      state.candidatesDetail.error = action.payload.message;
    });
  },
});

export const { selectCandidate, deleteCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;
