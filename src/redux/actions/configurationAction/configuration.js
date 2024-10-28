import axios from "axios";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration`

export const getConfigCounts = () => async (dispatch) => {
    try {
        dispatch(configurationActions.getConfigCountsRequest());
        console.log('getConfigCounts-req');
        const response = await axios.get(`${route}/count`, {
            withCredentials: true
        });

        console.log('get-config-count-res-data', response.data);
        dispatch(configurationActions.getConfigCountsSuccess(response.data));
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
        dispatch(configurationActions.getConfigCountsFailure(errorMessage));
    }
};