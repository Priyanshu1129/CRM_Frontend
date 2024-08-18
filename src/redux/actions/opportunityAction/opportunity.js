import axios from "axios";
import { opportunityActions } from "@/redux/slices/opportunitySlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/opportunity`

export const getAllOpportunities = () => async (dispatch) => {
    try {
        dispatch(opportunityActions.getAllOpportunitiesRequest());
        console.log('getAllOpportunities');
        const response = await axios.get(`${route}/`);

        console.log('get-all-opportunity-res-data', response.data);
        dispatch(opportunityActions.getAllOpportunitiesSuccess(response.data));
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
        dispatch(opportunityActions.getAllOpportunitiesFailure(errorMessage));
    }
};

export const getOpportunity = (opportunityId, token) => async (dispatch) => {
    try {
        console.log("get-opportunity-data", opportunityId, token);
        dispatch(opportunityActions.getOpportunityRequest());

        const data = await axios.get(`${route}/details/${opportunityId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-opportunity-details-res-data', data.data);
        dispatch(opportunityActions.getOpportunitySuccess(data.data));
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

        const response = await axios.post(`${route}/`, opportunityData);
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

export const updateOpportunity = (opportunityData, token, opportunityId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(opportunityData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (opportunityData?.avatarUri) {
        const fileName = opportunityData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: opportunityData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-opportunityData%", opportunityData,);
        console.log("update-opportunityData%", formData,);
        dispatch(opportunityActions.updateOpportunityRequest());
        console.log("update url----------", `${route}/${opportunityId}`);
        const data = await axios.put(
            `${route}/${opportunityId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-opportunity-res-data', data.data);
        dispatch(opportunityActions.updateOpportunitySuccess(data.data));
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
                    "Content-Type": "application/json",
                    "authorization": token
                },
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