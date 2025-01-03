import { axiosRequest } from "@/utilities/axiosHelper";
import { subSolutionActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/sub-solution`;

export const getAllSubSolutions = () => async (dispatch) => {
  try {
    dispatch(subSolutionActions.getAllSubSolutionsRequest());
    console.log("getAllSubSolutions");

    // Use axiosRequest helper function for GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for fetching data
      `${route}/`, // Endpoint for fetching all sub-solutions
      null, // No data needed for GET requests
      null // No query parameters for this request
    );

    console.log("get-all-subSolution-res-data", response);
    dispatch(subSolutionActions.getAllSubSolutionsSuccess(response));
  } catch (error) {
    console.log("error", error);
    dispatch(
      subSolutionActions.getAllSubSolutionsFailure(
        error.message || "Failed to get sub-solutions"
      )
    );
  }
};

export const getSubSolution = (subSolutionId) => async (dispatch) => {
  try {
    console.log("get-subSolution-data", subSolutionId);
    dispatch(subSolutionActions.getSubSolutionRequest());

    // Use axiosRequest helper function for GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for fetching data
      `${route}/details/${subSolutionId}`, // URL to fetch a specific sub-solution
      null, // No request body needed for GET request
      null // No query parameters for this request
    );

    console.log("get-subSolution-details-res-data", response);
    dispatch(subSolutionActions.getSubSolutionSuccess(response));
  } catch (error) {
    console.log("error", error);
    dispatch(
      subSolutionActions.getSubSolutionFailure(
        error.message || "Failed to get sub-solution"
      )
    );
  }
};

export const createSubSolution = (subSolutionData) => async (dispatch) => {
  try {
    dispatch(subSolutionActions.createSubSolutionRequest());

    // Use axiosRequest helper function for POST request
    const response = await axiosRequest(
      dispatch,
      "POST", // HTTP method for creating a new sub-solution
      `${route}/`, // URL to create a new sub-solution
      subSolutionData, // Send the subSolutionData as request body
      null // No query parameters for this request
    );

    console.log("create-subSolution-res-data", response);
    dispatch(subSolutionActions.createSubSolutionSuccess(response));
  } catch (error) {
    console.log("error", error);
    dispatch(
      subSolutionActions.createSubSolutionFailure(
        error.message || "Failed to create sub-solution"
      )
    );
  }
};

export const updateSubSolution =
  (subSolutionData, subSolutionId) => async (dispatch) => {
    try {
      console.log("update-subSolutionData%", subSolutionData);

      dispatch(subSolutionActions.updateSubSolutionRequest());

      // Use axiosRequest helper function for PUT request
      const response = await axiosRequest(
        dispatch,
        "PUT", // HTTP method for updating a sub-solution
        `${route}/${subSolutionId}`, // URL with the subSolutionId for updating a specific sub-solution
        subSolutionData, // Send subSolutionData as request body
        null // No query parameters for this request
      );

      console.log("update-subSolution-res-data", response);
      dispatch(subSolutionActions.updateSubSolutionSuccess(response));
      dispatch(getAllSubSolutions()); // Optionally fetch updated sub-solutions
    } catch (error) {
      console.log("error", error);
      dispatch(
        subSolutionActions.updateSubSolutionFailure(
          error.message || "Failed to update sub-solution"
        )
      );
    }
  };

export const deleteSubSolution = (subSolutionId) => async (dispatch) => {
  try {
    console.log("delete-subSolutionData", subSolutionId);
    dispatch(subSolutionActions.deleteSubSolutionRequest());

    // Use axiosRequest helper function for DELETE request
    const response = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for deleting a sub-solution
      `${route}/${subSolutionId}`, // URL for the specific sub-solution to delete
      null, // No data to send in the body for DELETE requests
      null // No query parameters
    );

    console.log("delete-subSolution-res-data", response);
    dispatch(subSolutionActions.deleteSubSolutionSuccess(response));
  } catch (error) {
    console.log("delete-subSolution-error", error);
    dispatch(
      subSolutionActions.deleteSubSolutionFailure(
        error.message || "Failed to delete sub-solution"
      )
    );
  }
};
