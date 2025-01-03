import { serverURL } from "@/config";
import { systemConfigActions } from "@/redux/slices/systemSlice";
import { axiosRequest } from "@/utilities/axiosHelper";
const route = `${serverURL}/system`;

export const getSystemConfig = () => async (dispatch) => {
  try {
    console.log("get-systemConfig-data");
    dispatch(systemConfigActions.getSystemConfigRequest());

    const response = await axiosRequest(dispatch, "GET", `${route}`);

    console.log("get-systemConfig-details-res-data", response);
    dispatch(systemConfigActions.getSystemConfigSuccess(response));
  } catch (error) {
    console.error("Unexpected error in getSystemConfig:", error);
    dispatch(systemConfigActions.getSystemConfigFailure(error.message));
  }
};

export const updateSystemConfig = (systemConfigData) => async (dispatch) => {
  try {
    console.log("update-systemConfigData-req", systemConfigData);
    dispatch(systemConfigActions.updateSystemConfigRequest());

    const response = await axiosRequest(
      dispatch,
      "PUT",
      `${route}/`,
      systemConfigData
    );

    console.log("update-systemConfig-res-data", response);
    dispatch(systemConfigActions.getSystemConfigSuccess(response));
    dispatch(systemConfigActions.updateSystemConfigSuccess(response));
  } catch (error) {
    console.error("Unexpected error in updateSystemConfig:", error);
    dispatch(systemConfigActions.updateSystemConfigFailure(error.message));
  }
};
