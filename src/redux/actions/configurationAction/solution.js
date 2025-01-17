import axios from "axios";
import { solutionActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";
import { axiosRequest } from "@/utilities/axiosHelper";
const route = `${serverURL}/configuration/solution`;

export const getAllSolutions =
  (config = false) =>
  async (dispatch) => {
    try {
      dispatch(solutionActions.getAllSolutionsRequest());
      console.log("getAllSolutions");
      const params = { config };
      const response = await axiosRequest(
        dispatch,
        "GET",
        `${route}/`,
        null,
        params
      ); // Use axiosRequest for the GET request

      console.log("get-all-solution-res-data", response);
      dispatch(solutionActions.getAllSolutionsSuccess(response));
    } catch (error) {
      console.log("Unexpected error in getAllSolutions:", error);
      dispatch(solutionActions.getAllSolutionsFailure(error.message));
    }
  };

export const getSolution = (solutionId) => async (dispatch) => {
  try {
    console.log("get-solution-data", solutionId);
    dispatch(solutionActions.getSolutionRequest());

    // Use axiosRequest helper function for GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method
      `${route}/details/${solutionId}`, // The URL with the specific solutionId
      null, // No data to send with the request
      null // No query parameters needed
    );

    console.log("get-solution-details-res-data", response);
    dispatch(solutionActions.getSolutionSuccess(response));
  } catch (error) {
    console.log("error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      solutionActions.getSolutionFailure(
        error.message || "Failed to get solution details"
      )
    );
  }
};

export const createSolution = (solutionData) => async (dispatch) => {
  try {
    console.log("createSolution solutionData: ", solutionData);
    dispatch(solutionActions.createSolutionRequest());

    // Use axiosRequest helper function for POST request
    const response = await axiosRequest(
      dispatch,
      "POST", // HTTP method
      `${route}/`, // The URL for creating a new solution
      solutionData, // The solution data to send with the request
      null
    );

    console.log("create-solution-res-data", response);
    dispatch(solutionActions.createSolutionSuccess(response));
  } catch (error) {
    console.log("error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      solutionActions.createSolutionFailure(
        error.message || "Failed to create solution"
      )
    );
  }
};

export const updateSolution =
  (solutionData, solutionId) => async (dispatch) => {
    try {
      console.log("update-solutionData", solutionData);

      dispatch(solutionActions.updateSolutionRequest());

      // Use axiosRequest helper function for PUT request
      const response = await axiosRequest(
        dispatch,
        "PUT", // HTTP method
        `${route}/${solutionId}`, // The URL for updating the solution
        solutionData, // The solution data to send with the request
        null
      );

      console.log("update-solution-res-data", response);
      dispatch(solutionActions.updateSolutionSuccess(response));
    } catch (error) {
      console.log("error", error);
      // Error message is handled by axiosRequest, so just pass it to the failure action
      dispatch(
        solutionActions.updateSolutionFailure(
          error.message || "Failed to update solution"
        )
      );
    }
  };

export const deleteSolution = (solutionId, confirm = 'true', undo = 'false') => async (dispatch) => {
  try {
    console.log("delete-solutionData", solutionId);

    dispatch(solutionActions.deleteSolutionRequest());

    // Use axiosRequest helper function for DELETE request
    const response = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method
      `${route}/${solutionId}?confirm=${confirm}&undo=${undo}` // The URL to delete the specific solution
    );

    console.log("delete-solution-res-data", response);
    dispatch(solutionActions.deleteSolutionSuccess(response));
  } catch (error) {
    console.log("delete-solution-error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      solutionActions.deleteSolutionFailure(
        error.message || "Failed to delete solution"
      )
    );
  }
};
