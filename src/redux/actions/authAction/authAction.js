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
    console.log("check-auth-response-data", response.data);
    // Handle the response based on the returned status
    dispatch(authActions.checkAuthSuccess(response.data));
  } catch (error) {
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
    console.log("login-response-data", response.data);
    dispatch(authActions.loginSuccess(response.data));
    // Optionally store the token in localStorage or cookies for future use
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

    dispatch(authActions.registerSuccess(response.data));
    // Optionally store the token or other relevant info
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

    console.log("logout-successfully:");
    dispatch(authActions.logoutSuccess(response));
    dispatch(authActions.resetAuthState());
    redirectTo("/login");
  } catch (error) {
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
