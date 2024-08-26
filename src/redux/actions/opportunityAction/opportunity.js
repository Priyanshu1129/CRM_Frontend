import axios from "axios";
import { opportunityActions } from "@/redux/slices/opportunitySlice"
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/opportunity`

export const getAllOpportunities = ({ page = null, limit = null, config = false }) => async (dispatch) => {
    try {
        if (config) {
            dispatch(mastersConfigActions.getConfigOpportunitiesRequest());
        } else {
            dispatch(opportunityActions.getAllOpportunitiesRequest());
        }
        console.log('getAllOpportunities config', config);
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config },
            withCredentials: true,
        });

        console.log('get-all-opportunity-res-data', response.data);
        if (config) {
            dispatch(mastersConfigActions.getConfigOpportunitiesSuccess(response.data.data))
        } else {
            dispatch(opportunityActions.getAllOpportunitiesSuccess(response.data.data));
        }
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
        if (config) {
            dispatch(mastersConfigActions.getConfigOpportunitiesFailure());
        } else {
            dispatch(opportunityActions.getAllOpportunitiesFailure(errorMessage));
        }
    }
};

export const getOpportunity = (opportunityId) => async (dispatch) => {
    try {
        console.log("get-opportunity-by-id", opportunityId);
        dispatch(opportunityActions.getOpportunityRequest());

        const response = await axios.get(`${route}/${opportunityId}`, {
            withCredentials: true,
        });
        console.log('get-opportunity-details-res-data', response.data);
        dispatch(opportunityActions.getOpportunitySuccess(response.data));
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
        dispatch(opportunityActions.getOpportunityFailure(errorMessage));
    }
};

export const createOpportunity = (opportunityData) => async (dispatch) => {
    try {
        console.log("create-opportunityData", opportunityData);
        dispatch(opportunityActions.createOpportunityRequest());

        const response = await axios.post(`${route}/`, opportunityData, {
            withCredentials: true,
        });
        console.log('create-opportunity-res-data', response);
        dispatch(opportunityActions.createOpportunitySuccess(response.data.data));
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
        dispatch(opportunityActions.createOpportunityFailure(errorMessage));
    }
};

export const updateOpportunity = (opportunityData, opportunityId) => async (dispatch) => {


    try {
        console.log("update-opportunityData-req", opportunityData,);
        dispatch(opportunityActions.updateOpportunityRequest());
        const response = await axios.put(
            `${route}/${opportunityId}`,
            opportunityData,
            {
                withCredentials: true,
            }
        );
        console.log('update-opportunity-res-data', response.data);
        dispatch(opportunityActions.getOpportunitySuccess(response.data));
        dispatch(opportunityActions.updateOpportunitySuccess(response.data));
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
        dispatch(opportunityActions.updateOpportunityFailure(errorMessage));
    }
};

export const deleteOpportunity = (opportunityId, token) => async (dispatch) => {
    try {
        console.log("delete-opportunityData", opportunityId);
        dispatch(opportunityActions.deleteOpportunityRequest());

        const data = await axios.delete(
            `${route}/${opportunityId}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        );
        console.log('delete-opportunity-res-data', data.data);
        dispatch(opportunityActions.deleteOpportunitySuccess(data.data));
    } catch (error) {
        console.log("delete-opportunity-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(opportunityActions.deleteOpportunityFailure(errorMessage));
    }
};