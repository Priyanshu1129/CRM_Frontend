import { serverURL } from "@/config";
import { targetActions } from "@/redux/slices/targetSlice";
import { axiosRequest } from "@/utilities/axiosHelper";

const route = `${serverURL}/target`;

export const getAllTargets =
  (entityType , year ) =>
  async (dispatch) => {
    try {
      console.log("get-all-target-req",entityType, year );
      dispatch(targetActions.getAllTargetsRequest());
      // Make the API call using the axiosRequest helper
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for PUT request
        `${route}`, // Endpoint for updating target by ID
        { entityType, year }, // Request body (targetData)
        null // No query parameters
      );

      console.log("get-all-target-res-data", response);

      dispatch(targetActions.getAllTargetsSuccess(response.data));
    } catch (error) {
      dispatch(
        targetActions.getAllTargetsFailure(error.message || "An error occurred")
      );
    }
  };

export const updateTarget =
  (entityType, entityId, year , targets) => async (dispatch) => {
    try {
      console.log("update-targetData-req", entityType, entityId, year , targets);
      dispatch(targetActions.updateTargetRequest());

      // Make the API call using the axiosRequest helper
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for PUT request
        `${route}/set`, // Endpoint for updating target by ID
        {entityType, entityId, year , targets}, // Request body (targetData)
        null // No query parameters
      );

      console.log("update-target-res-data", response.data);
      dispatch(targetActions.updateTargetSuccess(response.data));
    } catch (error) {
      dispatch(
        targetActions.updateTargetFailure(
          error.message || "An error occurred"
        )
      );
    }
  };
