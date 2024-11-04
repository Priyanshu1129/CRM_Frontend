import axios from "axios";
import {  funnelViewActions } from "@/redux/slices/dashboardSlice"; 
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/funnel-view`

export const getFunnelView = ({ particularDate, industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", startDate = null, endDate= null }) => async (dispatch) => {
    try {
        console.log("get-funnelView-data-req", solution);
        dispatch(funnelViewActions.getFunnelViewRequest());

        const response = await axios.post(`${route}/`, { particularDate, startDate, endDate }, {
            params: { industry, subIndustry, territory, solution, enteredBy },
            withCredentials: true,
        });
        console.log('get-funnelView-details-res-data', response.data);
        dispatch(funnelViewActions.getFunnelViewSuccess(response.data));
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
        dispatch(funnelViewActions.getFunnelViewFailure(errorMessage));
    }
};

