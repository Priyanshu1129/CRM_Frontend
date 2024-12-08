import axios from "axios";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/pipe-view`

export const getPipeView = ({ particularDate, industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "" }) => async (dispatch) => {
    try {
        console.log("get-pipeView-data-req", solution);
        dispatch(pipeViewActions.getPipeViewRequest());

        const response = await axios.post(`${route}/`, { particularDate }, {
            params: { industry, subIndustry, territory, solution, enteredBy },
            withCredentials: true,
        });
        console.log('get-pipeView-details-res-data', response.data);
        dispatch(pipeViewActions.getPipeViewSuccess(response.data));
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
        dispatch(pipeViewActions.getPipeViewFailure(errorMessage));
    }
};

