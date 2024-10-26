import axios from "axios";
import { industryActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/industry`

export const getAllIndustries = () => async (dispatch) => {
    try {
        dispatch(industryActions.getAllIndustriesRequest());
        console.log('getAllIndustries');
        const response = await axios.get(`${route}/`, {
            withCredentials: true
        });

        console.log('get-all-industry-res-data', response.data);
        dispatch(industryActions.getAllIndustriesSuccess(response.data));
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
        dispatch(industryActions.getAllIndustriesFailure(errorMessage));
    }
};

export const getIndustry = (industryId, token) => async (dispatch) => {
    try {
        console.log("get-industry-data", industryId, token);
        dispatch(industryActions.getIndustryRequest());

        const data = await axios.get(`${route}/details/${industryId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-industry-details-res-data', data.data);
        dispatch(industryActions.getIndustrySuccess(data.data));
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
        dispatch(industryActions.getIndustryFailure(errorMessage));
    }
};

export const createIndustry = (industryData) => async (dispatch) => {
    try {
        console.log("create-industryData", industryData);
        dispatch(industryActions.createIndustryRequest());
        

        const data = await axios.post(
            `${route}/`,
            industryData,
            {
               withCredentials : true
            }
        );
        console.log('create-industry-res-data', data);
        dispatch(industryActions.createIndustrySuccess(data.data));
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
        dispatch(industryActions.createIndustryFailure(errorMessage));
    }
};

export const updateIndustry = (industryData,industryId) => async (dispatch) => {


    try {
        console.log("update-industryData%", industryData,);
        console.log("update-industry-ID", industryId,);
        dispatch(industryActions.updateIndustryRequest());
        console.log("update url----------", `${route}/${industryId}`);
        const data = await axios.put(
            `${route}/${industryId}`,
            industryData,
            {
               withCredentials : true
            }
        );
        console.log('update-industry-res-data', data.data);
        dispatch(industryActions.updateIndustrySuccess(data.data));
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
        dispatch(industryActions.updateIndustryFailure(errorMessage));
    }
};

export const deleteIndustry = (industryId, token) => async (dispatch) => {
    try {
        console.log("delete-industryData", industryId);
        dispatch(industryActions.deleteIndustryRequest());

        const data = await axios.delete(
            `${route}/${industryId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-industry-res-data', data.data);
        dispatch(industryActions.deleteIndustrySuccess(data.data));
    } catch (error) {
        console.log("delete-industry-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(industryActions.deleteIndustryFailure(errorMessage));
    }
};