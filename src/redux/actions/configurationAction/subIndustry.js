import { subIndustryActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";
import { axiosRequest } from "@/utilities/axiosHelper";
const route = `${serverURL}/configuration/sub-industry`;

export const getAllSubIndustries =
  (config = false) =>
  async (dispatch) => {
    try {
      dispatch(subIndustryActions.getAllSubIndustriesRequest());
      console.log("getAllSubIndustries");
      const params = { config };
      // Use the axiosRequest helper function for GET request
      const response = await axiosRequest(
        dispatch,
        "GET", // HTTP method
        `${route}/`, // The URL for the sub-industry list
        null,
        params
      );

      console.log("get-all-subIndustry-res-data", response);
      dispatch(subIndustryActions.getAllSubIndustriesSuccess(response));
    } catch (error) {
      console.log("error", error);
      dispatch(
        subIndustryActions.getAllSubIndustriesFailure(
          error.message || "Failed to fetch sub-industries"
        )
      );
    }
  };

export const getSubIndustry = (subIndustryId) => async (dispatch) => {
  try {
    dispatch(subIndustryActions.getSubIndustryRequest());
    console.log("get-subIndustry-data", subIndustryId);

    // Use the axiosRequest helper function for GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method
      `${route}/details/${subIndustryId}`, // The URL with subIndustryId
      null, // No body required for GET request
      null // No query parameters for this example
    );

    console.log("get-subIndustry-details-res-data", response);
    dispatch(subIndustryActions.getSubIndustrySuccess(response));
  } catch (error) {
    console.log("error", error);
    dispatch(
      subIndustryActions.getSubIndustryFailure(
        error.message || "Failed to fetch sub-industry details"
      )
    );
  }
};

export const createSubIndustry = (subIndustryData) => async (dispatch) => {
  try {
    dispatch(subIndustryActions.createSubIndustryRequest());
    console.log("create-subIndustryData-req", subIndustryData);

    // Use axiosRequest helper function for POST request
    const response = await axiosRequest(
      dispatch,
      "POST", // HTTP method
      `${route}/`, // The URL endpoint for creating a new sub-industry
      subIndustryData, // The body data for the POST request
      null // No query parameters for this request
    );

    console.log("create-subIndustry-res-data", response);
    dispatch(subIndustryActions.createSubIndustrySuccess(response));
    dispatch(
      subIndustryActions.updateSubIndustryList({
        type: "add",
        payload: response?.data,
      })
    );
  } catch (error) {
    console.log("error", error);
    dispatch(
      subIndustryActions.createSubIndustryFailure(
        error.message || "Failed to create sub-industry"
      )
    );
  }
};

export const updateSubIndustry =
  (subIndustryData, subIndustryId) => async (dispatch) => {
    try {
      console.log("update-subIndustryData-req", subIndustryData);

      dispatch(subIndustryActions.updateSubIndustryRequest());

      // Use axiosRequest helper function for PUT request
      const response = await axiosRequest(
        dispatch,
        "PUT", // HTTP method for updating
        `${route}/${subIndustryId}`, // The endpoint for updating a specific sub-industry
        subIndustryData, // The body data for the PUT request
        null // No query parameters for this request
      );

      console.log("update-subIndustry-res-data", response);
      dispatch(subIndustryActions.updateSubIndustrySuccess(response));
      dispatch(
        subIndustryActions.updateSubIndustryList({
          type: "update",
          payload: response?.data,
        })
      );
    } catch (error) {
      console.log("error", error);
      dispatch(
        subIndustryActions.updateSubIndustryFailure(
          error.message || "Failed to update sub-industry"
        )
      );
    }
  };

export const deleteSubIndustry = (subIndustryId) => async (dispatch) => {
  try {
    console.log("delete-subIndustryData", subIndustryId);
    dispatch(subIndustryActions.deleteSubIndustryRequest());

    // Use axiosRequest helper function for DELETE request
    const response = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for deleting
      `${route}/${subIndustryId}`, // The endpoint for deleting a specific sub-industry
      null, // No data needed for DELETE requests
      null // No query parameters for this request
    );

    console.log("delete-subIndustry-res-data", response);
    dispatch(subIndustryActions.deleteSubIndustrySuccess(response));
  } catch (error) {
    console.log("delete-subIndustry-error", error);
    dispatch(
      subIndustryActions.deleteSubIndustryFailure(
        error.message || "Failed to delete sub-industry"
      )
    );
  }
};
