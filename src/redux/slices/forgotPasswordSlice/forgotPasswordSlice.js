import { createSlice } from "@reduxjs/toolkit";
const initialUserState = {
  verifyOTP: {
    status: null,
    error: null,
    data: null,
  },
  setNewPassword: {
    status: null,
    error: null,
    data: null,
  },
  forgotPassword: {
    status: null,
    error: null,
    data: null,
  },
};

const forgetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: initialUserState,
  reducers: {
    forgotPasswordRequest: (state, action) => {
      state.forgotPassword.status = "pending";
    },
    forgotPasswordSuccess: (state, action) => {
      state.forgotPassword.status = "success";
      state.forgotPassword.data = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.forgotPassword.status = "failed";
      state.forgotPassword.error = action.payload;
    },
    clearForgotPasswordStatus: (state) => {
      state.forgotPassword.status = null;
    },
    clearForgotPasswordError: (state) => {
      state.forgotPassword.error = null;
    },
    verifyOTPRequest: (state) => {
      state.verifyOTP.status = "pending";
    },
    verifyOTPSuccess: (state, action) => {
      state.verifyOTP.status = "success";
      state.verifyOTP.data = action.payload;
    },
    verifyOTPFailure: (state, action) => {
      state.verifyOTP.status = "failed";
      state.verifyOTP.error = action.payload;
    },
    clearVerifyOTPStatus: (state) => {
      state.verifyOTP.status = null;
    },
    clearVerifyOTPError: (state) => {
      state.verifyOTP.error = null;
    },
    setNewPasswordRequest: (state) => {
      state.setNewPassword.status = "pending";
    },
    setNewPasswordSuccess: (state, action) => {
      state.setNewPassword.status = "success";
    },
    setNewPasswordFailure: (state, action) => {
      state.setNewPassword.status = "failed";
      state.setNewPassword.error = action.payload;
    },
    clearSetNewPasswordStatus: (state) => {
      state.setNewPassword.status = null;
    },
    clearSetNewPasswordError: (state) => {
      state.setNewPassword.error = null;
    },
  },
});

export const forgotPasswordActions = forgetPasswordSlice.actions;
export const forgotPasswordReducer = forgetPasswordSlice.reducer;
