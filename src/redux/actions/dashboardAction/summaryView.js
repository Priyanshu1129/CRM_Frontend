import axios from "axios";
import { summaryViewActions } from "@/redux/slices/dashboardSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/summary-view`

export const getSummaryView = ({ industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", startDate = null, endDate = null }) => async (dispatch) => {
    try {
        console.log("get-summaryView-data-req", startDate, endDate);
        dispatch(summaryViewActions.getSummaryViewRequest());

        const response = await axios.post(`${route}?myView=false`, { startDate, endDate }, {
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

export const getMySummaryView = ({ industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", startDate = null, endDate = null }) => async (dispatch) => {
    try {
        console.log("get-My-summaryView-data-req", startDate, endDate);
        dispatch(summaryViewActions.getMySummaryViewRequest());

        const response = await axios.post(`${route}?myView=true`, { startDate, endDate }, {
            withCredentials: true,
        });
        console.log('get-my-summaryView-details-res-data', response.data);
        dispatch(summaryViewActions.getMySummaryViewSuccess(response.data));
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
        dispatch(summaryViewActions.getMySummaryViewFailure(errorMessage));
    }
};

export const getHeatmapView = ({ industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", year = "", stageId = "", subStageId = "" }) => async (dispatch) => {
    try {
        console.log("get-heatmapView-data-req", stageId, year);
        dispatch(summaryViewActions.getHeatmapViewRequest());

        const response = await axios.post(`${route}/heat-map?myView=false`, { year, stageId, subStageId }, {
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

export const getMyHeatmapView = ({ industry = "", subIndustry = "", territory = "", solution = "", enteredBy = "", year = "", stageId = "", subStageId = "" }) => async (dispatch) => {
    try {
        console.log("get-my-heatmapView-data-req", stageId, year);
        dispatch(summaryViewActions.getMyHeatmapViewRequest());

        const response = await axios.post(`${route}/heat-map?myView=true`, { year, stageId, subStageId }, {
            withCredentials: true,
        });
        console.log('get-my-heatmapView-details-res-data', response.data);
        dispatch(summaryViewActions.getMyHeatmapViewSuccess(response.data));
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
        dispatch(summaryViewActions.getMyHeatmapViewFailure(errorMessage));
    }
};
