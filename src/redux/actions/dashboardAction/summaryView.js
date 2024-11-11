import axios from "axios";
import { summaryViewActions } from "@/redux/slices/dashboardSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/summary-view`

export const getSummaryView = ({ industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", startDate = null, endDate = null }) => async (dispatch) => {
    try {
        console.log("get-summaryView-data-req", startDate, endDate);
        dispatch(summaryViewActions.getSummaryViewRequest());

        const response = await axios.post(`${route}/`, { startDate, endDate }, {
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


export const getHeatmapView = ({ industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", year = "", stageId = "", subStageId = "" }) => async (dispatch) => {
    try {
        console.log("get-heatmapView-data-req", stageId, year);
        dispatch(summaryViewActions.getHeatmapViewRequest());

        const response = await axios.post(`${route}/heat-map`, { year, stageId, subStageId }, {
            withCredentials: true,
        });
        console.log('get-heatmapView-details-res-data', response.data);
        dispatch(summaryViewActions.getHeatmapViewSuccess(response.data));
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
        dispatch(summaryViewActions.getHeatmapViewFailure(errorMessage));
    }
};
