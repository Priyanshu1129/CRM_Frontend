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

// export const createSalesStage = (salesStageData, token) => async (dispatch) => {
//   try {
//     console.log("create-salesStageData", salesStageData);
//     dispatch(salesStageActions.createSalesStageRequest());
//     const formData = new FormData();

//     // Append other form data to FormData
//     Object.entries(salesStageData).forEach(([key, value]) => {
//       if (key != "avatarUri") {
//         formData.append(key, value);
//       }
//     });

//     const fileName = salesStageData.avatarUri.split("/").pop();
//     // Determine file type based on file extension
//     const fileType = fileName.split(".").pop();

//     // Append avatar file to FormData
//     formData.append("avatar", {
//       uri: salesStageData.avatarUri,
//       type: `image/${fileType}`,
//       name: fileName,
//     });

//     console.log("formdata-----before");
//     console.log("formdata-----", formData);

//     const data = await axios.post(`${route}/`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         authorization: token,
//       },
//     });
//     console.log("create-salesStage-res-data", data);
//     dispatch(salesStageActions.createSalesStageSuccess(data.data));
//   } catch (error) {
//     console.log("error", error);
//     let errorMessage = "An error occurred";
//     if (error.response) {
//       errorMessage = error.response.data.message || "Server error";
//     } else if (error.request) {
//       errorMessage = "Network error";
//     } else {
//       errorMessage = error.message || "Unknown error";
//     }
//     dispatch(salesStageActions.createSalesStageFailure(errorMessage));
//   }
// };

export const updateSalesStage =
  (salesStageData, salesStageId) => async (dispatch) => {
    try {
      console.log("update-salesStageData", salesStageData);
      dispatch(salesStageActions.updateSalesStageRequest());
      console.log("update url----------", `${route}/${salesStageId}`);

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

// export const deleteSalesStage = (salesStageId, token) => async (dispatch) => {
//   try {
//     console.log("delete-salesStageData", salesStageId);
//     dispatch(salesStageActions.deleteSalesStageRequest());

//     const data = await axios.delete(`${route}/${salesStageId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         authorization: token,
//       },
//     });
//     console.log("delete-salesStage-res-data", data.data);
//     dispatch(salesStageActions.deleteSalesStageSuccess(data.data));
//   } catch (error) {
//     console.log("delete-salesStage-error", error);
//     let errorMessage = "An error occurred";
//     if (error.response) {
//       errorMessage = error.response.data.message || "Server error";
//     } else if (error.request) {
//       errorMessage = "Network error";
//     } else {
//       errorMessage = error.message || "Unknown error";
//     }
//     dispatch(salesStageActions.deleteSalesStageFailure(errorMessage));
//   }
// };
