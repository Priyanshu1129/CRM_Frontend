import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    authDetails: {
        status: null,
        error: null,
        data: null,
    },
    logout: {
        status: null,
        error: null
    },
    verifyOTP: {
        status: null,
        error: null,
        data: null,
    },
    changePassword: {
        status: null,
        error: null,
        data: null,
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        registerRequest: (state, action) => {
            state.authDetails.status = 'pending'
        },
        registerSuccess: (state, action) => {
            state.authDetails.status = 'success'
            state.authDetails.data = action.payload;
        },
        registerFailure: (state, action) => {
            state.authDetails.status = 'failed'
            state.authDetails.data = null
            state.authDetails.error = action.payload;
        },
        loginRequest: (state, action) => {
            state.authDetails.status = 'pending'
        },
        loginSuccess: (state, action) => {
            state.authDetails.status = 'success'
            state.authDetails.data = action.payload;
        },
        loginFailure: (state, action) => {
            state.authDetails.status = 'failed'
            state.authDetails.error = action.payload;
        },
        logoutRequest: (state, action) => {
            state.logout.status = "pending";
        },
        logoutSuccess: (state, action) => {
            state.logout.status = 'success'
            state.logout.data = null
        },
        logoutFailure: (state, action) => {
            state.logout.status = 'failed';
        },
        forgotPasswordRequest: (state, action) => {
            state.authDetails.status = 'pending'
        },
        forgotPasswordSuccess: (state, action) => {
            state.authDetails.status = 'success'
            state.authDetails.data = action.payload
        },
        forgotPasswordFailure: (state, action) => {
            state.authDetails.status = 'failed'
            state.authDetails.error = action.payload
        },
        verifyOTPRequest: (state) => {
            state.verifyOTP.status = 'pending'
        },
        verifyOTPSuccess: (state, action) => {
            state.verifyOTP.status = 'success'
            state.verifyOTP.data = action.payload
        },
        verifyOTPFailure: (state, action) => {
            state.verifyOTP.status = 'failed'
            state.verifyOTP.error = action.payload
        },
        changePasswordRequest: (state) => {
            state.changePassword.status = 'pending'
        },
        changePasswordSuccess: (state, action) => {
            state.changePassword.status = 'success'
            state.changePassword.data = action.payload
        },
        changePasswordFailure: (state, action) => {
            state.changePassword.status = 'failed'
            state.changePassword.error = action.payload
        },
        clearAuthDetailsStatus: (state) => {
            state.authDetails.status = null;
        },
        clearAuthDetailsError: (state) => {
            state.authDetails.error = null;
        },
        clearAuthDetailsData: (state) => {
            state.authDetails.data = null;
        },
        clearLogoutStatus: (state) => {
            state.logout.status = null;
        },
        clearLogoutError: (state) => {
            state.logout.error = null;
        },
        clearLogoutData: (state) => {
            state.logout.data = null;
        },
        clearVerifyOTPStatus: (state) => {
            state.verifyOTP.status = null;
        },
        clearVerifyOTPError: (state) => {
            state.verifyOTP.error = null;
        },
        clearChangePasswordStatus: (state) => {
            state.changePassword.status = null;
        },
        clearChangePasswordError: (state) => {
            state.changePassword.error = null;
        }
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;