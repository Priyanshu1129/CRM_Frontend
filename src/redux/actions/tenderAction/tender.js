import { axiosRequest } from "@/utilities/axiosHelper";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";

const route = `${serverURL}/tender`;

export const getAllTenders =
  ({
    page = null,
    limit = null,
    config = false,
    entryDate = "",
    enteredBy = "",
  }) =>
  async (dispatch) => {
    try {
      // Dispatching action for requesting data
      if (config) {
        dispatch(mastersConfigActions.getConfigTendersRequest());
      } else {
        dispatch(tenderActions.getAllTendersRequest());
      }

      console.log("getAllTenders-config", config);

      // Using axiosRequest helper function for GET request
      const data = await axiosRequest(
        dispatch,
        "GET", // HTTP method for GET request
        `${route}/`, // URL for getting all tenders
        null,
        {
          limit,
          page,
          config,
          enteredBy,
          entry_date: entryDate,
        } // params as the request body
      );

      console.log("get-all-tender-res-data", data);

      if (config) {
        dispatch(mastersConfigActions.getConfigTendersSuccess(data?.data));
      } else {
        dispatch(tenderActions.getAllTendersSuccess(data?.data));
      }
    } catch (error) {
      console.log("error", error);
      let errorMessage = error.message || "An error occurred";
      if (config) {
        dispatch(mastersConfigActions.getConfigTendersFailure());
      } else {
        dispatch(tenderActions.getAllTendersFailure(errorMessage));
      }
    }
  };

export const getTender = (tenderId) => async (dispatch) => {
  try {
    console.log("get-tender-data", tenderId);
    dispatch(tenderActions.getTenderRequest());

    const data = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/${tenderId}`, // Endpoint for getting a tender by ID
      null, // No data needed for GET request
      null // No query parameters
    );

    console.log("get-tender-details-res-data", data);
    dispatch(tenderActions.getTenderSuccess(data));
  } catch (error) {
    console.log("error", error);
    dispatch(tenderActions.getTenderFailure(error.message));
  }
};

export const createTender = (tenderData) => async (dispatch) => {
  try {
    console.log("create-tenderData", tenderData);
    dispatch(tenderActions.createTenderRequest());

    const data = await axiosRequest(
      dispatch,
      "POST", // HTTP method for POST request
      `${route}/`, // Endpoint for creating a tender
      tenderData, // Data to be sent in the POST request
      null // No query parameters
    );

    console.log("create-tender-res-data", data);
    dispatch(tenderActions.createTenderSuccess(data));
  } catch (error) {
    console.log("error", error);
    dispatch(tenderActions.createTenderFailure(error.message));
  }
};

export const updateTender = (tenderData, tenderId) => async (dispatch) => {
  try {
    console.log("update-tenderData-req", tenderData);
    dispatch(tenderActions.updateTenderRequest());

    const data = await axiosRequest(
      dispatch,
      "PUT", // HTTP method for PUT request
      `${route}/${tenderId}`, // Endpoint for updating a tender by ID
      tenderData, // Data to be updated
      null // No query parameters
    );

    console.log("update-tender-res-data", data);
    dispatch(tenderActions.getTenderSuccess(data)); // You might want to dispatch this if needed
    dispatch(tenderActions.updateTenderSuccess(data));
  } catch (error) {
    console.log("error", error);
    dispatch(tenderActions.updateTenderFailure(error.message));
  }
};

export const deleteTender = (tenderId, confirm = 'false') => async (dispatch) => {
  try {
    console.log("delete-tenderData", tenderId);
    dispatch(tenderActions.deleteTenderRequest());

    const data = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for DELETE request
      `${route}/${tenderId}?confirm=${confirm}`, // Endpoint for deleting a tender by ID
    );

    console.log("delete-tender-res-data", data);
    dispatch(tenderActions.deleteTenderSuccess(data));
  } catch (error) {
    console.log("delete-tender-error", error);
    dispatch(tenderActions.deleteTenderFailure(error.message));
  }
};
