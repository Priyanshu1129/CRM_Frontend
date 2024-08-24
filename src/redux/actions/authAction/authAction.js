import axios from "axios";
import { authActions } from "@/redux/slices/authSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/auth`

export const login = (loginData) => async (dispatch) => {
    try {
        console.log("loginData", loginData);
        dispatch(authActions.loginRequest());

        const response = await axios.post(
            `${route}/login`,
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;

        if (status === 'success') {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isAuthenticated', true);
            dispatch(authActions.loginSuccess(data));
        } else {
            dispatch(authActions.loginFailure(message));
        }
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.loginFailure(errorMessage));
    }
};

export const register = (registrationData) => async (dispatch) => {
    try {
        console.log("registrationData", registrationData);
        dispatch(authActions.registerRequest());
        const response = await axios.post(
            `${route}/signup`,
            registrationData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('registration-res:', response.data);
        dispatch(authActions.registerSuccess(response));
    } catch (error) {
        console.log('registration-error', error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.registerFailure(errorMessage));
    }
};

export const logout = () => async (dispatch) => {
    try {
        console.log("logout-req");
        dispatch(authActions.logoutRequest());
        const response = await axios.get(
            `${route}/logout`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        localStorage.removeItem("user");
        localStorage.removeItem('isAuthenticated');
        console.log('logout-res:');
        dispatch(authActions.logoutSuccess(response));
    } catch (error) {
        console.log('registration-error', error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.logoutFailure(errorMessage));
    }
};

export const forgotPassword = (forgotPasswordData) => async (dispatch) => {
    try {
        console.log('forgotPasswordData', forgotPasswordData)
        dispatch(authActions.forgotPasswordRequest());

        const response = await axios.post(
            `${route}/send-reset-password-email`,
            forgotPasswordData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('forgot-password-res', response);
        dispatch(authActions.forgotPasswordSuccess(response));
    } catch (error) {
        console.log("error", error.response.data.message)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.forgotPasswordFailure(errorMessage));
    }
};

export const resetPasswordWithOTP = (otpData) => async (dispatch) => {
    try {
        console.log('verifyOTPData', otpData);
        dispatch(authActions.verifyOTPRequest());

        const { data } = await axios.post(
            `${route}/reset-password-with-otp`,
            otpData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('forgot-password-res', data);
        dispatch(authActions.verifyOTPSuccess(data));
    } catch (error) {
        console.log("error", error.response.data.message)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.verifyOTPFailure(errorMessage));
    }
};

export const changePassword = (data) => async (dispatch) => {
    try {
        console.log("change-password-data", data);
        dispatch(authActions.changePasswordRequest());

        const response = await axios.post(
            `${route}/change-password`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch(authActions.changePasswordSuccess(data));
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.changePasswordSuccess(errorMessage));
    }
};

