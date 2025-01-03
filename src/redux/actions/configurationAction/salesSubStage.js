import { axiosRequest } from "@/utilities/axiosHelper";
import { salesSubStageActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/sales-sub-stage`;

export const getAllSalesSubStages = () => async (dispatch) => {
  try {
    dispatch(salesSubStageActions.getAllSalesSubStagesRequest());
    console.log("getAllSalesSubStages");

    // Use axiosRequest helper function for GET request
    const response = await axiosRequest(
      dispatch,
      "GET",
      `${route}/`,
      null, // No data for GET request
      null // No query params for GET request
    );

    console.log("get-all-salesSubStage-res-data", response);
    dispatch(salesSubStageActions.getAllSalesSubStagesSuccess(response));
  } catch (error) {
    console.log("error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      salesSubStageActions.getAllSalesSubStagesFailure(
        error.message || "Failed to get all sales sub-stages"
      )
    );
  }
};

export const getSalesSubStage = (salesSubStageId) => async (dispatch) => {
  try {
    console.log("get-salesSubStage-data", salesSubStageId);
    dispatch(salesSubStageActions.getSalesSubStageRequest());

    // Use axiosRequest helper function for GET request
    const response = await axiosRequest(
      dispatch,
      "GET",
      `${route}/details/${salesSubStageId}`,
      null, // No data for GET request
      null // No query parameters
    );

    console.log("get-salesSubStage-details-res-data", response);
    dispatch(salesSubStageActions.getSalesSubStageSuccess(response));
  } catch (error) {
    console.log("error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      salesSubStageActions.getSalesSubStageFailure(
        error.message || "Failed to fetch sales sub-stage"
      )
    );
  }
};

export const createSalesSubStage = (salesSubStageData) => async (dispatch) => {
  try {
    console.log("create-req-salesSubStageData", salesSubStageData);

    // Use axiosRequest helper function for POST request
    const response = await axiosRequest(
      dispatch,
      "POST",
      `${route}/`,
      salesSubStageData, // Pass the salesSubStageData as the request payload
      null // No query parameters needed
    );

    console.log("create-salesSubStage-res-data", response);
    dispatch(salesSubStageActions.createSalesSubStageSuccess(response));
  } catch (error) {
    console.log("error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      salesSubStageActions.createSalesSubStageFailure(
        error.message || "Failed to create sales sub-stage"
      )
    );
  }
};

export const updateSalesSubStage =
  (salesSubStageData, salesSubStageId) => async (dispatch) => {
    try {
      console.log("update-salesSubStageData", salesSubStageData);
      dispatch(salesSubStageActions.updateSalesSubStageRequest());

      // Use axiosRequest helper function for PUT request
      const response = await axiosRequest(
        dispatch,
        "PUT", // HTTP method
        `${route}/${salesSubStageId}`, // The URL with the specific salesSubStageId
        salesSubStageData, // The data for the PUT request
        null // No query parameters needed
      );

      console.log("update-salesSubStage-res-data", response);
      dispatch(salesSubStageActions.updateSalesSubStageSuccess(response));
    } catch (error) {
      console.log("error", error);
      // Error message is handled by axiosRequest, so just pass it to the failure action
      dispatch(
        salesSubStageActions.updateSalesSubStageFailure(
          error.message || "Failed to update sales sub-stage"
        )
      );
    }
  };

export const deleteSalesSubStage = (salesSubStageId) => async (dispatch) => {
  try {
    console.log("delete-salesSubStageData", salesSubStageId);
    dispatch(salesSubStageActions.deleteSalesSubStageRequest());

    // Use axiosRequest helper function for DELETE request
    const response = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method
      `${route}/${salesSubStageId}`, // The URL with the specific salesSubStageId
      null, // No data to send with the request
      null // No query parameters needed
    );

    console.log("delete-salesSubStage-res-data", response);
    dispatch(salesSubStageActions.deleteSalesSubStageSuccess(response));
  } catch (error) {
    console.log("delete-salesSubStage-error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      salesSubStageActions.deleteSalesSubStageFailure(
        error.message || "Failed to delete sales sub-stage"
      )
    );
  }
};
