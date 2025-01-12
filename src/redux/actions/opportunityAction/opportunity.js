import { axiosRequest } from "@/utilities/axiosHelper";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/opportunity`;

export const getAllOpportunities =
  ({
    page = null,
    limit = null,
    config = false,
    entryDate = "",
    enteredBy = "",
  }) =>
  async (dispatch) => {
    try {
      if (config) {
        dispatch(mastersConfigActions.getConfigOpportunitiesRequest());
      } else {
        dispatch(opportunityActions.getAllOpportunitiesRequest());
      }

      console.log("getAllOpportunities config", config);

      // Make the API call using the axiosRequest helper
      const response = await axiosRequest(
        dispatch,
        "GET", // HTTP method for GET request
        `${route}/`, // Endpoint for getting all opportunities
        null, // No request body
        { limit, page, config, enteredBy, entry_date: entryDate } // Query parameters
      );

      console.log("get-all-opportunity-res-data", response);

      if (config) {
        dispatch(
          mastersConfigActions.getConfigOpportunitiesSuccess(response.data)
        );
      } else {
        dispatch(opportunityActions.getAllOpportunitiesSuccess(response.data));
      }
    } catch (error) {
      dispatch(
        opportunityActions.getAllOpportunitiesFailure(
          error.message || "An error occurred"
        )
      );
      if (config) {
        dispatch(mastersConfigActions.getConfigOpportunitiesFailure());
      }
    }
  };

export const getOpportunity = (opportunityId) => async (dispatch) => {
  try {
    console.log("get-opportunity-by-id", opportunityId);
    dispatch(opportunityActions.getOpportunityRequest());

    // Make the API call using the axiosRequest helper
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/${opportunityId}`, // Endpoint for getting opportunity by ID
      null, // No request body
      null // No query parameters
    );

    console.log("get-opportunity-details-res-data", response);
    dispatch(opportunityActions.getOpportunitySuccess(response));
  } catch (error) {
    dispatch(
      opportunityActions.getOpportunityFailure(
        error.message || "An error occurred"
      )
    );
  }
};

export const createOpportunity = (opportunityData) => async (dispatch) => {
  try {
    console.log("create-opportunityData", opportunityData);
    dispatch(opportunityActions.createOpportunityRequest());

    // Make the API call using the axiosRequest helper
    const response = await axiosRequest(
      dispatch,
      "POST", // HTTP method for POST request
      `${route}/`, // Endpoint for creating opportunity
      opportunityData, // Request body (opportunityData)
      null // No query parameters
    );

    console.log("create-opportunity-res-data", response);
    dispatch(opportunityActions.createOpportunitySuccess(response.data.data));
  } catch (error) {
    dispatch(
      opportunityActions.createOpportunityFailure(
        error.message || "An error occurred"
      )
    );
  }
};

export const updateOpportunity =
  (opportunityData, opportunityId) => async (dispatch) => {
    try {
      console.log("update-opportunityData-req", opportunityData);
      dispatch(opportunityActions.updateOpportunityRequest());

      // Make the API call using the axiosRequest helper
      const response = await axiosRequest(
        dispatch,
        "PUT", // HTTP method for PUT request
        `${route}/${opportunityId}`, // Endpoint for updating opportunity by ID
        opportunityData, // Request body (opportunityData)
        null // No query parameters
      );

      console.log("update-opportunity-res-data", response.data);
      dispatch(opportunityActions.getOpportunitySuccess(response.data));
      dispatch(opportunityActions.updateOpportunitySuccess(response.data));
    } catch (error) {
      dispatch(
        opportunityActions.updateOpportunityFailure(
          error.message || "An error occurred"
        )
      );
    }
  };

export const deleteOpportunity = (opportunityId, confirm = 'false') => async (dispatch) => {
  try {
    console.log("delete-opportunityData", opportunityId);
    dispatch(opportunityActions.deleteOpportunityRequest());

    // Make the API call using the axiosRequest helper
    const response = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for DELETE request
      `${route}/${opportunityId}?confirm=${confirm}`, // Endpoint for deleting opportunity by ID
    );

    console.log("delete-opportunity-res-data", response.data);
    dispatch(opportunityActions.deleteOpportunitySuccess(response));
  } catch (error) {
    dispatch(
      opportunityActions.deleteOpportunityFailure(
        error.message || "An error occurred"
      )
    );
  }
};
