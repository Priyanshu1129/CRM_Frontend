import axios from "axios";
import { logout } from "@/redux/actions/authAction";
import { redirectTo } from "./globalRouter";
import { notification } from "antd";
export const axiosRequest = async (
  dispatch,
  method,
  url,
  data = null,
  params = null
) => {
  try {
    const isFormData = data instanceof FormData;

    const config = {
      method, // GET, POST, PUT, DELETE, etc.
      url, // Endpoint URL
      data, // Data for POST/PUT requests
      params, // Query parameters for GET requests
      withCredentials: true, // Ensures cookies are sent with requests
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json", // Dynamically set Content-Type
      },
    };

    const response = await axios(config);

    // Return the response data if successful
    return response.data;
  } catch (error) {
    console.log("axios-req-error", error);
    let errorMessage = "An error occurred"; // Default error message

    // Handle network-related errors (e.g., no internet)
    if (!error.response) {
      errorMessage = "Network error. Please check your connection.";
    }
    // Handle server response errors (status codes, like 400, 401, etc.)
    else if (error.response) {
      // Handle different response status codes
      const status = error.response.status;

      // Unauthorized (Token expired or invalid)
      if (status === 401) {
        errorMessage = "Session expired. Please log in again.";
        dispatch(logout());
        // notification.error({
        //   message: "Error",
        //   description: errorMessage,
        // });
      }
      if (status === 403) {
        errorMessage =
          error.response.data.message ||
          "You are not authorized for this action!";
        // redirectTo("/unauthorized");
      }
      // Handle specific server errors like validation failures
      else if (status === 400 || status === 500) {
        errorMessage = error.response.data.message || "Server error";
      }
      // Handle other specific cases if necessary
      else {
        errorMessage = error.response.data.message || `Error: ${status}`;
      }
    }
    // Return a uniform error format for the caller to handle
    throw {
      ...error,
      message: errorMessage,
      status: error.response?.status || null,
    };
  }
};
