import { axiosRequest } from "@/utilities/axiosHelper";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration`;

export const getConfigCounts = () => async (dispatch) => {
  try {
    dispatch(configurationActions.getConfigCountsRequest());
    console.log("getConfigCounts-req");

    // Use axiosRequest helper function to make the GET request
    const response = await axiosRequest(dispatch, "GET", `${route}/count`);

    console.log("get-config-count-res-data", response);
    dispatch(configurationActions.getConfigCountsSuccess(response));
  } catch (error) {
    console.log("get-config-counts-error", error);
    // Error message is handled by axiosRequest, so just pass it to the failure action
    dispatch(
      configurationActions.getConfigCountsFailure(
        error.message || "Failed to get config counts"
      )
    );
  }
};
