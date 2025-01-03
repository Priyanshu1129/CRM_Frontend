import { axiosRequest } from "@/utilities/axiosHelper";
import { authActions } from "@/redux/slices/authSlice";
import { serverURL } from "@/config/config";
import { redirectTo } from "@/utilities/globalRouter";

const route = `${serverURL}/auth`;

// if (!data.token || !data.user) {
//   throw new Error("Invalid login response");
// }

export const checkAuth = () => async (dispatch) => {
  try {
    console.log("checkAuth");
    dispatch(authActions.checkAuthRequest());

    // Using the improved axiosRequest function
    const response = await axiosRequest(
      dispatch,
      "get",
      `${serverURL}/check-login-user`
    );

    // Handle the response based on the returned status
    if (response.status === "success") {
      dispatch(authActions.checkAuthSuccess(response.data));
    } else {
      dispatch(authActions.checkAuthFailure(response.message));
    }
  } catch (error) {
    console.log("checkAuth-error", error);
    dispatch(authActions.checkAuthFailure(error.message));
  }
};

export const login = (loginData) => async (dispatch) => {
  try {
    console.log("loginData", loginData);
    dispatch(authActions.loginRequest());

    // Using the axiosRequest helper to handle login
    const response = await axiosRequest(
      dispatch,
      "post", // HTTP method for POST request
      `${route}/login`, // Login endpoint
      loginData // Send the login data (username/password)
    );

    // Handle the response status from the server
    if (response.status === "success") {
      dispatch(authActions.loginSuccess(response.data));
      // Optionally store the token in localStorage or cookies for future use
    } else {
      dispatch(authActions.loginFailure(response.message));
    }
  } catch (error) {
    console.log("login-error", error);
    dispatch(authActions.loginFailure(error.message || "An error occurred"));
  }
};

export const register = (registrationData) => async (dispatch) => {
  try {
    console.log("registrationData", registrationData);
    dispatch(authActions.registerRequest());

    // Using the axiosRequest helper to handle registration
    const response = await axiosRequest(
      dispatch,
      "post", // HTTP method for POST request
      `${route}/signup`, // Signup endpoint
      registrationData // Send the registration data (name, email, password, etc.)
    );

    // Handle the response from the server
    if (response.status === "success") {
      dispatch(authActions.registerSuccess(response.data));
      // Optionally store the token or other relevant info
    } else {
      dispatch(authActions.registerFailure(response.message));
    }
  } catch (error) {
    console.log("registration-error", error);
    dispatch(authActions.registerFailure(error.message || "An error occurred"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    console.log("logout-req");
    dispatch(authActions.logoutRequest());

    // Using axiosRequest to perform the logout request
    const response = await axiosRequest(
      dispatch,
      "get", // HTTP method for GET request
      `${route}/logout` // Logout endpoint
    );

    // If response is successful, proceed with the logout actions
    if (response.status === "success") {
      console.log("logout-successfully:");
      dispatch(authActions.logoutSuccess(response));
      dispatch(authActions.resetAuthState());
      redirectTo("/login"); // Redirect to the login page after successful logout
    } else {
      dispatch(authActions.logoutFailure(response.message || "Logout failed"));
    }
  } catch (error) {
    // If there's any error, the axiosRequest function already handles it
    dispatch(
      authActions.logoutFailure(
        error.message || "Unable to logout. Please try again"
      )
    );
  }
};

export const forgotPassword = (forgotPasswordData) => async (dispatch) => {
  try {
    console.log("forgotPasswordData", forgotPasswordData);
    dispatch(authActions.forgotPasswordRequest());

    // Using axiosRequest to perform the forgot password request
    const response = await axiosRequest(
      dispatch,
      "post", // POST request method
      `${route}/send-reset-password-email`, // API endpoint for sending reset email
      forgotPasswordData
    );

    // If the response is successful, dispatch the success action
    dispatch(authActions.forgotPasswordSuccess(response));
  } catch (error) {
    // If an error occurs, it will be handled by axiosRequest
    dispatch(
      authActions.forgotPasswordFailure(error.message || "An error occurred")
    );
  }
};

export const resetPasswordWithOTP = (otpData) => async (dispatch) => {
  try {
    console.log("verifyOTPData", otpData);
    dispatch(authActions.verifyOTPRequest());

    // Using axiosRequest to perform the reset password with OTP request
    const response = await axiosRequest(
      dispatch,
      "post", // POST request method
      `${route}/reset-password-with-otp`, // API endpoint for reset password with OTP
      otpData
    );

    // If the response is successful, dispatch the success action
    dispatch(authActions.verifyOTPSuccess(response));
  } catch (error) {
    // If an error occurs, it will be handled by axiosRequest
    dispatch(
      authActions.verifyOTPFailure(error.message || "An error occurred")
    );
  }
};

export const changePassword = (data) => async (dispatch) => {
  try {
    console.log("change-password-data", data);
    dispatch(authActions.changePasswordRequest());

    // Using axiosRequest to perform the change password request
    const response = await axiosRequest(
      dispatch,
      "post", // POST request method
      `${route}/change-password`, // API endpoint for changing the password
      data
    );

    // If the response is successful, dispatch the success action
    dispatch(authActions.changePasswordSuccess(response));
  } catch (error) {
    // If an error occurs, it will be handled by axiosRequest
    dispatch(
      authActions.changePasswordFailure(error.message || "An error occurred")
    );
  }
};
