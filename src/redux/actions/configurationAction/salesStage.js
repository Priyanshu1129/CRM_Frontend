import axios from "axios";
import { salesStageActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";
import { axiosRequest } from "@/utilities/axiosHelper";

const route = `${serverURL}/configuration/sales-stage`;

export const getAllSalesStages =
  (config = false) =>
  async (dispatch) => {
    try {
      dispatch(salesStageActions.getAllSalesStagesRequest());
      console.log("getAllSalesStages");
      const params = { config };
      // Use axiosRequest helper function for GET request
      const response = await axiosRequest(
        dispatch,
        "GET",
        `${route}/`,
        null, // No data for GET request
        params // No query params for GET request
      );

      console.log("get-all-salesStage-res-data", response);
      dispatch(salesStageActions.getAllSalesStagesSuccess(response));
    } catch (error) {
      console.log("error", error);
      // Error message is handled by axiosRequest, so just pass it to the failure action
      dispatch(
        salesStageActions.getAllSalesStagesFailure(
          error.message || "Failed to get sales stages"
        )
      );
    }
  };

export const getSalesStage = (salesStageId) => async (dispatch) => {
  try {
    console.log("get-salesStage-data", salesStageId);
    dispatch(salesStageActions.getSalesStageRequest());

    // Use axiosRequest helper function for GET request
    const response = await axiosRequest(
      dispatch,
      "GET",
      `${route}/details/${salesStageId}`,
      null, // No data for GET request
      null // No query params for GET request
    );

    console.log("get-salesStage-details-res-data", response);
    dispatch(salesStageActions.getSalesStageSuccess(response));
  } catch (error) {
    console.log("error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      salesStageActions.getSalesStageFailure(
        error.message || "Failed to get sales stage"
      )
    );
  }
};

export const updateSalesStage =
  (salesStageData, salesStageId) => async (dispatch) => {
    try {
      console.log("update-salesStageData-req", salesStageData);
      dispatch(salesStageActions.updateSalesStageRequest());

      // Use axiosRequest helper function for PUT request
      const response = await axiosRequest(
        dispatch,
        "PUT",
        `${route}/${salesStageId}`,
        salesStageData, // The data to update
        null // No query params for this request
      );

      console.log("update-salesStage-res-data", response);
      dispatch(salesStageActions.updateSalesStageSuccess(response));
      dispatch(
        salesStageActions.updateSalesStageList({
          type: "update",
          payload: response?.data,
        })
      );
    } catch (error) {
      console.log("error", error);
      // Error message is handled by axiosRequest, so just pass it to the failure action
      dispatch(
        salesStageActions.updateSalesStageFailure(
          error.message || "Failed to update sales stage"
        )
      );
    }
  };
