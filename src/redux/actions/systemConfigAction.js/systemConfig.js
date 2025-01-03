import { serverURL } from "@/config";
import { systemConfigActions } from "@/redux/slices/systemSlice";
import axios from "axios";
const route = `${serverURL}/system`
export const updateSystemConfig = (systemConfigData) => async (dispatch) => {
    try {
        console.log("update-systemConfigData-req", systemConfigData);
        dispatch(systemConfigActions.updateSystemConfigRequest());
        const response = await axios.put(
            `${route}/`,
            systemConfigData,
            {
                withCredentials: true,
            }
        );
        console.log('update-systemConfig-res-data', response.data);
        dispatch(systemConfigActions.getSystemConfigSuccess(response.data));
        dispatch(systemConfigActions.updateSystemConfigSuccess(response.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(systemConfigActions.updateSystemConfigFailure(errorMessage));
    }
};

export const getSystemConfig = () => async (dispatch) => {
    try {
        console.log("get-systemConfig-data", );
        dispatch(systemConfigActions.getSystemConfigRequest());

        const response = await axios.get(`${route}`, {
            withCredentials: true,
        });
        console.log('get-systemConfig-details-res-data', response.data);
        dispatch(systemConfigActions.getSystemConfigSuccess(response.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(systemConfigActions.getSystemConfigFailure(errorMessage));
    }
};