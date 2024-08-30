import axios from "axios";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/bd`

export const getAllBusinessDevelopments = ({ page = null, limit = null, config = false, entryDate = "", enteredBy = "" }) => async (dispatch) => {
    try {
        dispatch(businessDevelopmentActions.getAllBusinessDevelopmentsRequest());
        console.log('getAllBusinessDevelopments');
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config, enteredBy, entryDate },
            withCredentials: true,
        });

        console.log('get-all-businessDevelopment-res-data', response.data);
        dispatch(businessDevelopmentActions.getAllBusinessDevelopmentsSuccess(response.data.data));
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
        dispatch(businessDevelopmentActions.getAllBusinessDevelopmentsFailure(errorMessage));
    }
};

export const getBusinessDevelopment = (businessDevelopmentId) => async (dispatch) => {
    try {
        console.log("get-businessDevelopment-data", businessDevelopmentId);
        dispatch(businessDevelopmentActions.getBusinessDevelopmentRequest());

        const response = await axios.get(`${route}/${businessDevelopmentId}`, {
            withCredentials: true,
        });
        console.log('get-businessDevelopment-details-res-data', response.data);
        dispatch(businessDevelopmentActions.getBusinessDevelopmentSuccess(response.data));
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
        dispatch(businessDevelopmentActions.getBusinessDevelopmentFailure(errorMessage));
    }
};

export const createBusinessDevelopment = (businessDevelopmentData) => async (dispatch) => {
    try {
        console.log("create-businessDevelopmentData", businessDevelopmentData);
        dispatch(businessDevelopmentActions.createBusinessDevelopmentRequest());

        const response = await axios.post(`${route}/`, businessDevelopmentData, {
            withCredentials: true,
        });
        console.log('create-businessDevelopment-res-data', response);
        dispatch(businessDevelopmentActions.createBusinessDevelopmentSuccess(response.data));
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
        dispatch(businessDevelopmentActions.createBusinessDevelopmentFailure(errorMessage));
    }
};

export const updateBusinessDevelopment = (businessDevelopmentData, businessDevelopmentId) => async (dispatch) => {

    try {
        console.log("update-businessDevelopmentData-req", businessDevelopmentData,);
        dispatch(businessDevelopmentActions.updateBusinessDevelopmentRequest());
        const response = await axios.put(
            `${route}/${businessDevelopmentId}`,
            businessDevelopmentData,
            {
                withCredentials: true,
            }
        );
        console.log('update-businessDevelopment-res-data', response.data);
        dispatch(businessDevelopmentActions.getBusinessDevelopmentSuccess(response.data));
        dispatch(businessDevelopmentActions.updateBusinessDevelopmentSuccess(response.data));
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
        dispatch(businessDevelopmentActions.updateBusinessDevelopmentFailure(errorMessage));
    }
};

export const deleteBusinessDevelopment = (businessDevelopmentId, token) => async (dispatch) => {
    try {
        console.log("delete-businessDevelopmentData", businessDevelopmentId);
        dispatch(businessDevelopmentActions.deleteBusinessDevelopmentRequest());

        const data = await axios.delete(
            `${route}/${businessDevelopmentId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        console.log('delete-businessDevelopment-res-data', data.data);
        dispatch(businessDevelopmentActions.deleteBusinessDevelopmentSuccess(data.data));
    } catch (error) {
        console.log("delete-businessDevelopment-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(businessDevelopmentActions.deleteBusinessDevelopmentFailure(errorMessage));
    }
};