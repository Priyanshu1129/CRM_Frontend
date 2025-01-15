import { axiosRequest } from "@/utilities/axiosHelper";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/registration`;

export const getAllRegistrations =
  ({
    page = null,
    limit = null,
    config = false,
    entryDate = "",
    enteredBy = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch(registrationActions.getAllRegistrationsRequest());
      console.log("getAllRegistrations");

      const response = await axiosRequest(dispatch, "GET", `${route}/`, {
        limit,
        page,
        config,
        enteredBy,
        entry_date: entryDate,
      });

      console.log("get-all-registration-res-data", response);
      dispatch(registrationActions.getAllRegistrationsSuccess(response.data));
    } catch (error) {
      console.error("Unexpected error in getAllRegistrations:", error);
      dispatch(registrationActions.getAllRegistrationsFailure(error.message));
    }
  };

// Get Registration
export const getRegistration = (registrationId) => async (dispatch) => {
  try {
    dispatch(registrationActions.getRegistrationRequest());
    console.log("get-registration-data", registrationId);

    const response = await axiosRequest(
      dispatch,
      "GET",
      `${route}/${registrationId}`
    );

    console.log("get-registration-details-res-data", response);
    dispatch(registrationActions.getRegistrationSuccess(response));
  } catch (error) {
    console.log("Unexpected error in getRegistration:", error);
    dispatch(registrationActions.getRegistrationFailure(error.message));
  }
};

// Create Registration
export const createRegistration = (registrationData) => async (dispatch) => {
  try {
    dispatch(registrationActions.createRegistrationRequest());
    console.log("create-registrationData", registrationData);

    const response = await axiosRequest(
      dispatch,
      "POST",
      `${route}/`,
      registrationData
    );

    console.log("create-registration-res-data", response);
    dispatch(registrationActions.createRegistrationSuccess(response.data));
    dispatch(
      registrationActions.updateRegistrationList({
        type: "add",
        payload: response.data,
      })
    );
  } catch (error) {
    console.log("Unexpected error in createRegistration:", error);
    dispatch(registrationActions.createRegistrationFailure(error.message));
  }
};

// Update Registration
export const updateRegistration =
  (registrationData, registrationId) => async (dispatch) => {
    try {
      dispatch(registrationActions.updateRegistrationRequest());
      console.log("update-registrationData-req", registrationData);

      const response = await axiosRequest(
        dispatch,
        "PUT",
        `${route}/${registrationId}`,
        registrationData
      );

      console.log("update-registration-res-data", response);
      dispatch(registrationActions.getRegistrationSuccess(response));
      dispatch(registrationActions.updateRegistrationSuccess(response));
      dispatch(
        registrationActions.updateRegistrationList({
          type: "update",
          payload: response.data,
        })
      );
    } catch (error) {
      console.log("Unexpected error in updateRegistration:", error);
      dispatch(registrationActions.updateRegistrationFailure(error.message));
    }
  };

// Delete Registration
export const deleteRegistration =
  (registrationId, confirm = "false") =>
  async (dispatch) => {
    try {
      dispatch(registrationActions.deleteRegistrationRequest());
      console.log("delete-registrationData", registrationId);

      const response = await axiosRequest(
        dispatch,
        "DELETE",
        `${route}/${registrationId}?confirm=${confirm}`
      );

      console.log("delete-registration-res-data", response);
      dispatch(registrationActions.deleteRegistrationSuccess(response));
    } catch (error) {
      console.log("Unexpected error in deleteRegistration:", error);
      dispatch(registrationActions.deleteRegistrationFailure(error.message));
    }
  };
