import { axiosRequest } from "@/utilities/axiosHelper";
import { userActions } from "@/redux/slices/userSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/user`;

export const getAllUsers =
  ({ page = null, limit = null, config = false }) =>
  async (dispatch) => {
    try {
      // Dispatch the appropriate request action based on config flag
      if (config) {
        dispatch(mastersConfigActions.getConfigUsersRequest());
      } else {
        dispatch(userActions.getAllUsersRequest());
      }

      console.log("getAllUsers config", config);

      // Make the API call using the axiosRequest helper
      const response = await axiosRequest(
        dispatch,
        "GET", // HTTP method for GET request
        `${route}/`, // Endpoint for getting users
        null, // No data for GET request
        { limit, page, config } // Query parameters for pagination and config
      );

      console.log("get-all-user-res-data", response);

      // Dispatch success actions based on config flag
      if (config) {
        dispatch(mastersConfigActions.getConfigUsersSuccess(response?.data));
      } else {
        dispatch(userActions.getAllUsersSuccess(response?.data));
      }
    } catch (error) {
      // If error occurs, handle failure with the specific error message
      if (config) {
        dispatch(mastersConfigActions.getConfigUsersFailure());
      } else {
        dispatch(
          userActions.getAllUsersFailure(error.message || "An error occurred")
        );
      }
    }
  };

export const getUser = (userId) => async (dispatch) => {
  try {
    console.log("get-user-data-by id", userId);
    dispatch(userActions.getUserRequest());

    // Make the API call using the axiosRequest helper
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/${userId}` // Endpoint for getting user by id
    );

    console.log("get-user-details-res-data", response);
    dispatch(userActions.getUserSuccess(response));
  } catch (error) {
    dispatch(userActions.getUserFailure(error.message || "An error occurred"));
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    console.log("create-user-data", userData);
    dispatch(userActions.createUserRequest());

    // Make the API call using the axiosRequest helper
    const response = await axiosRequest(
      dispatch,
      "POST", // HTTP method for POST request
      `${route}/`, // Endpoint for creating a new user
      userData, // Data to be sent in the request body
      null // No query parameters
    );

    console.log("create-user-res-data", response);
    dispatch(userActions.createUserSuccess(response.data));
    dispatch(
      userActions.updateUserList({
        type: "add",
        payload: response.data.user,
      })
    );
  } catch (error) {
    dispatch(
      userActions.createUserFailure(error.message || "An error occurred")
    );
  }
};

export const updateUser = (userData, userId) => async (dispatch) => {
  try {
    console.log("update-userData-req", userData);
    dispatch(userActions.updateUserRequest());

    // Make the API call using the axiosRequest helper
    const response = await axiosRequest(
      dispatch,
      "PUT", // HTTP method for PUT request
      `${route}/${userId}`, // Endpoint for updating the user by ID
      userData, // Data to be sent in the request body
      null // No query parameters
    );

    console.log("update-user-res-data", response.data);

    dispatch(userActions.getUserSuccess(response));
    dispatch(
      userActions.updateUserList({
        type: "update",
        payload: response.data,
      })
    );
    dispatch(userActions.updateUserSuccess(response.data));
  } catch (error) {
    dispatch(
      userActions.updateUserFailure(error.message || "An error occurred")
    );
  }
};

export const deleteUser = (userId, confirm = 'true' ,undo='false') => async (dispatch) => {
  try {
    console.log("delete-userData", userId);
    dispatch(userActions.deleteUserRequest());

    // Make the API call using the axiosRequest helper
    const response = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for DELETE request
      `${route}/${userId}?undo=${undo}&confirm=${confirm}` // Endpoint for deleting a user by ID
    );

    console.log("delete-user-res-data", response.data);
    dispatch(userActions.deleteUserSuccess(response.data));
    dispatch(
      userActions.updateUserList({
        type: "delete",
        payload: response.data.user,
      })
    );
  } catch (error) {
    dispatch(
      userActions.deleteUserFailure(error.message || "An error occurred")
    );
  }
};
