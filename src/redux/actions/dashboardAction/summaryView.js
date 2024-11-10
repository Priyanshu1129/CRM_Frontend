import axios from "axios";
import {  summaryViewActions } from "@/redux/slices/dashboardSlice"; 
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/summary-view`

export const getSummaryView = ({ particularDate, industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", startDate = null, endDate= null }) => async (dispatch) => {
    try {
        console.log("get-summaryView-data-req", solution);
        dispatch(summaryViewActions.getSummaryViewRequest());

        const response = await axios.post(`${route}/`, { particularDate, startDate, endDate }, {
            params: { industry, subIndustry, territory, solution, enteredBy },
            withCredentials: true,
        });
        console.log('get-summaryView-details-res-data', response.data);
        dispatch(summaryViewActions.getSummaryViewSuccess(response.data));
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
        dispatch(summaryViewActions.getSummaryViewFailure(errorMessage));
    }
};

