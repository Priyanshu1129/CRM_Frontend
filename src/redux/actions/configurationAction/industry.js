import axios from "axios";
import { industryActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";
import { axiosRequest } from "@/utilities/axiosHelper";
const route = `${serverURL}/configuration/industry`;

export const getAllIndustries =
  (config = false) =>
  async (dispatch) => {
    try {
      dispatch(industryActions.getAllIndustriesRequest());
      console.log("getAllIndustries");
      const params = { config };
      // Use axiosRequest helper function to make the GET request
      const response = await axiosRequest(
        dispatch,
        "GET",
        `${route}/`,
        null,
        params
      );

      console.log("get-all-industry-res-data", response);
      dispatch(industryActions.getAllIndustriesSuccess(response));
    } catch (error) {
      console.log("get-all-industries-error", error);
      // Error message is handled by axiosRequest, so just pass it to the failure action
      dispatch(
        industryActions.getAllIndustriesFailure(
          error.message || "Failed to get industries"
        )
      );
    }
  };

export const getIndustry = (industryId) => async (dispatch) => {
  try {
    console.log("get-industry-data", industryId);
    dispatch(industryActions.getIndustryRequest());

    // Use axiosRequest helper function to make the GET request
    const response = await axiosRequest(
      dispatch,
      "GET",
      `${route}/details/${industryId}`,
      null,
      null
    );

    console.log("get-industry-details-res-data", response);
    dispatch(industryActions.getIndustrySuccess(response));
  } catch (error) {
    console.log("get-industry-error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      industryActions.getIndustryFailure(
        error.message || "Failed to get industry details"
      )
    );
  }
};

export const createIndustry = (industryData) => async (dispatch) => {
  try {
    console.log("create-industryData", industryData);
    dispatch(industryActions.createIndustryRequest());

    // Use axiosRequest helper function for POST request
    const response = await axiosRequest(
      dispatch,
      "POST",
      `${route}/`,
      industryData,
      null // No query params for POST
    );

    console.log("create-industry-res-data", response);
    dispatch(industryActions.createIndustrySuccess(response));
    dispatch(
      industryActions.updateIndustryList({
        type: "add",
        payload: response?.data,
      })
    );
  } catch (error) {
    console.log("create-industry-error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      industryActions.createIndustryFailure(
        error.message || "Failed to create industry"
      )
    );
  }
};

export const updateIndustry =
  (industryData, industryId) => async (dispatch) => {
    try {
      console.log("update-industryData-req", industryData);
      dispatch(industryActions.updateIndustryRequest());

      // Use axiosRequest helper function for PUT request
      const response = await axiosRequest(
        dispatch,
        "PUT",
        `${route}/${industryId}`,
        industryData,
        null // No query params for PUT
      );

      console.log("update-industry-res-data", response);
      dispatch(industryActions.updateIndustrySuccess(response));
      dispatch(
        industryActions.updateIndustryList({
          type: "update",
          payload: response?.data,
        })
      );
    } catch (error) {
      console.log("update-industry-error", error);
      // Error message is handled by axiosRequest, so just pass it to the failure action
      dispatch(
        industryActions.updateIndustryFailure(
          error.message || "Failed to update industry"
        )
      );
    }
  };

export const deleteIndustry = (industryId, confirm = 'true', undo = 'false') => async (dispatch) => {
  try {
    console.log("delete-industryData", industryId);
    dispatch(industryActions.deleteIndustryRequest());

    // Use axiosRequest helper function for DELETE request
    const response = await axiosRequest(
      dispatch,
      "DELETE",
      `${route}/${industryId}?confirm=${confirm}&undo=${undo}`,
    );

    console.log("delete-industry-res-data", response);
    dispatch(industryActions.deleteIndustrySuccess(response));
  } catch (error) {
    console.log("delete-industry-error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      industryActions.deleteIndustryFailure(
        error.message || "Failed to delete industry"
      )
    );
  }
};
