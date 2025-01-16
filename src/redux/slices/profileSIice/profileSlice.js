import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  profile: {
    status: null,
    data: null,
    error: null,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialUserState,
  reducers: {
    profileRequest: (state) => {
      state.profile.status = "pending";
    },
    profileSuccess: (state, action) => {
      state.profile.status = "success";
      state.profile.data = action.payload;
    },
    profileFailure: (state, action) => {
      state.profile.status = "failed";
      state.profile.error = action.payload;
    },
    clearProfileStatus: (state) => {
      state.profile.status = null;
    },
    clearProfileError: (state) => {
      state.profile.error = null;
    },
  },
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
