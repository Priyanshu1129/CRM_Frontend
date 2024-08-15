import axios from "axios";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/businessDevelopment`

export const getAllBusinessDevelopments = (token) => async (dispatch) => {
    try {
        dispatch(businessDevelopmentActions.getAllBusinessDevelopmentsRequest());
        console.log('getAllBusinessDevelopments', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-all-businessDevelopment-res-data', data.data);
        dispatch(businessDevelopmentActions.getAllBusinessDevelopmentsSuccess(data.data));
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

export const getBusinessDevelopment = (businessDevelopmentId, token) => async (dispatch) => {
    try {
        console.log("get-businessDevelopment-data", businessDevelopmentId, token);
        dispatch(businessDevelopmentActions.getBusinessDevelopmentRequest());

        const data = await axios.get(`${route}/details/${businessDevelopmentId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-businessDevelopment-details-res-data', data.data);
        dispatch(businessDevelopmentActions.getBusinessDevelopmentSuccess(data.data));
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

export const createBusinessDevelopment = (businessDevelopmentData, token) => async (dispatch) => {
    try {
        console.log("create-businessDevelopmentData", businessDevelopmentData);
        dispatch(businessDevelopmentActions.createBusinessDevelopmentRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(businessDevelopmentData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = businessDevelopmentData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: businessDevelopmentData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });

        console.log("formdata-----before")
        console.log("formdata-----", formData)

        const data = await axios.post(
            `${route}/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('create-businessDevelopment-res-data', data);
        dispatch(businessDevelopmentActions.createBusinessDevelopmentSuccess(data.data));
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

export const updateBusinessDevelopment = (businessDevelopmentData, token, businessDevelopmentId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(businessDevelopmentData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (businessDevelopmentData?.avatarUri) {
        const fileName = businessDevelopmentData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: businessDevelopmentData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-businessDevelopmentData%", businessDevelopmentData,);
        console.log("update-businessDevelopmentData%", formData,);
        dispatch(businessDevelopmentActions.updateBusinessDevelopmentRequest());
        console.log("update url----------", `${route}/${businessDevelopmentId}`);
        const data = await axios.put(
            `${route}/${businessDevelopmentId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-businessDevelopment-res-data', data.data);
        dispatch(businessDevelopmentActions.updateBusinessDevelopmentSuccess(data.data));
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
                    "authorization": token
                },
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