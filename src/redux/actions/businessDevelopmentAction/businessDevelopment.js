import axios from "axios";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { serverURL } from "@/config/config";
import { axiosRequest } from "@/utilities/axiosHelper";

const route = `${serverURL}/bd`;

export const getAllBusinessDevelopments =
  ({
    page = null,
    limit = null,
    config = false,
    entryDate = "",
    enteredBy = "",
  }) =>
  async (dispatch) => {
    try {
      // Dispatch the request action
      dispatch(businessDevelopmentActions.getAllBusinessDevelopmentsRequest());
      console.log("Fetching all business developments...");

      // Build the query parameters
      const params = {
        limit,
        page,
        config,
        enteredBy,
        entry_date: entryDate,
      };

      // Make the API call using axiosRequest
      const response = await axiosRequest(
        dispatch,
        "GET",
        `${route}/`,
        null, // No request body for GET
        { params } // Pass query params
      );

      // Dispatch the success action with the response data
      console.log("get-all-businessDevelopment-res-data", response);
      dispatch(
        businessDevelopmentActions.getAllBusinessDevelopmentsSuccess(
          response.data
        )
      );
    } catch (error) {
      // Error handling is already managed by axiosRequest
      console.log("Error in getAllBusinessDevelopments", error);

      // Dispatch failure with error message from axiosRequest
      dispatch(
        businessDevelopmentActions.getAllBusinessDevelopmentsFailure(
          error.message
        )
      );
    }
  };

export const getBusinessDevelopment =
  (businessDevelopmentId) => async (dispatch) => {
    try {
      console.log("get-businessDevelopment-data", businessDevelopmentId);
      dispatch(businessDevelopmentActions.getBusinessDevelopmentRequest());

      // Use axiosRequest helper function
      const response = await axiosRequest(
        dispatch,
        "GET",
        `${route}/${businessDevelopmentId}`
      );

      console.log("get-businessDevelopment-details-res-data", response);
      dispatch(
        businessDevelopmentActions.getBusinessDevelopmentSuccess(response)
      );
    } catch (error) {
      console.log("get-businessDevelopment-error", error);

      // Error message already handled and displayed by axiosRequest
      dispatch(
        businessDevelopmentActions.getBusinessDevelopmentFailure(
          error.message || "Failed to fetch Business Development data"
        )
      );
    }
  };

export const createBusinessDevelopment =
  (businessDevelopmentData) => async (dispatch) => {
    try {
      console.log("create-businessDevelopmentData", businessDevelopmentData);
      dispatch(businessDevelopmentActions.createBusinessDevelopmentRequest());

      // Use axiosRequest helper function
      const response = await axiosRequest(
        dispatch,
        "POST",
        `${route}/`,
        businessDevelopmentData
      );

      console.log("create-businessDevelopment-res-data", response);
      dispatch(
        businessDevelopmentActions.createBusinessDevelopmentSuccess(response)
      );
      dispatch(
        businessDevelopmentActions.updateBusinessDevelopmentList({
          type: "add",
          payload: response.data,
        })
      );
    } catch (error) {
      console.log("create-businessDevelopment-error", error);

      // Error message already handled and displayed by axiosRequest
      dispatch(
        businessDevelopmentActions.createBusinessDevelopmentFailure(
          error.message || "Failed to create Business Development data"
        )
      );
    }
  };

export const updateBusinessDevelopment =
  (businessDevelopmentData, businessDevelopmentId) => async (dispatch) => {
    try {
      console.log(
        "update-businessDevelopmentData-req",
        businessDevelopmentData
      );
      dispatch(businessDevelopmentActions.updateBusinessDevelopmentRequest());

      // Use axiosRequest helper function
      const response = await axiosRequest(
        dispatch,
        "PUT",
        `${route}/${businessDevelopmentId}`,
        businessDevelopmentData
      );

      console.log("update-businessDevelopment-res-data", response);

      // Dispatch success actions
      dispatch(
        businessDevelopmentActions.getBusinessDevelopmentSuccess(response)
      );
      dispatch(
        businessDevelopmentActions.updateBusinessDevelopmentSuccess(response)
      );
      dispatch(
        businessDevelopmentActions.updateBusinessDevelopmentList({
          type: "update",
          payload: response.data,
        })
      );
    } catch (error) {
      console.log("update-businessDevelopment-error", error);

      // Error message already handled and displayed by axiosRequest
      dispatch(
        businessDevelopmentActions.updateBusinessDevelopmentFailure(
          error.message || "Failed to update Business Development data"
        )
      );
    }
  };

export const deleteBusinessDevelopment =
  (businessDevelopmentId, confirm = "false") =>
  async (dispatch) => {
    try {
      console.log("delete-businessDevelopmentData", businessDevelopmentId);
      dispatch(businessDevelopmentActions.deleteBusinessDevelopmentRequest());

      // Use axiosRequest helper function
      const response = await axiosRequest(
        dispatch,
        "DELETE",
        `${route}/${businessDevelopmentId}?confirm=${confirm}`
      );

      console.log("delete-businessDevelopment-res-data", response);

      // Dispatch success action
      dispatch(
        businessDevelopmentActions.deleteBusinessDevelopmentSuccess(response)
      );
    } catch (error) {
      console.log("delete-businessDevelopment-error", error);

      // Error message already handled and displayed by axiosRequest
      dispatch(
        businessDevelopmentActions.deleteBusinessDevelopmentFailure(
          error.message || "Failed to delete Business Development data"
        )
      );
    }
  };
