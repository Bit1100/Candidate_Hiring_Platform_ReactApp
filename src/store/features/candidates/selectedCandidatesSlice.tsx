import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { candidatesDetailState } from "../../../types";

type selectedCandidatesState = {
  candidates: { id: number }[];
  totalSelected: number;
  candidatesDetail: {
    candidates: candidatesDetailState[];
    loading: boolean;
    error: string;
  };
};

const initialState: selectedCandidatesState = {
  candidates: [],
  totalSelected: 0,
  candidatesDetail: {
    candidates: [],
    loading: false,
    error: "",
  },
};

// Action Creator fetching single candidate at a time and populating the candidates under candidatesDetail object
export const fetchSelectedCandidatesById = createAsyncThunk(
  "candidates/fetchSelectedCandidatesById",
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

export const candidatesSlice = createSlice({
  name: "selectedCandidates",
  initialState,
  reducers: {
    savedCandidates: (
      state,
      action: PayloadAction<candidatesDetailState[]>
    ) => {
      let count = 0;
      action.payload?.forEach((item) => {
        state.candidatesDetail.candidates.push(item);
        state.candidates.push({ id: item.id });
        count++;
      });
      state.totalSelected = count;
    },
    selectCandidate: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const candidate = {
        id,
      };
      if (!state.candidates?.some((e) => e["id"] === id)) {
        state.candidates.push(candidate);
        state.totalSelected += 1;
      }
    },
    deleteCandidate: (state, action: PayloadAction<number>) => {
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
    builder.addCase(
      fetchSelectedCandidatesById.fulfilled,
      (state, action: PayloadAction<candidatesDetailState>) => {
        state.candidatesDetail.loading = false;
        state.candidatesDetail.candidates.push(action.payload);
        state.candidatesDetail.error = "";
      }
    );
    builder.addCase(fetchSelectedCandidatesById.rejected, (state, action) => {
      state.candidatesDetail.loading = false;
      state.candidatesDetail.error =
        action.error.message || "Something Went Wrong";
    });
  },
});

export const { savedCandidates, selectCandidate, deleteCandidate } =
  candidatesSlice.actions;

export default candidatesSlice.reducer;
