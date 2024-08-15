import axios from "axios";
import { subIndustryActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/sub-industry`

export const getAllSubIndustries = () => async (dispatch) => {
    try {
        dispatch(subIndustryActions.getAllSubIndustriesRequest());
        console.log('getAllSubIndustries');
        const response = await axios.get(`${route}/`);

        console.log('get-all-subIndustry-res-data', response.data);
        dispatch(subIndustryActions.getAllSubIndustriesSuccess(response.data));
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
        dispatch(subIndustryActions.getAllSubIndustriesFailure(errorMessage));
    }
};

export const getSubIndustry = (subIndustryId, token) => async (dispatch) => {
    try {
        console.log("get-subIndustry-data", subIndustryId, token);
        dispatch(subIndustryActions.getSubIndustryRequest());

        const data = await axios.get(`${route}/details/${subIndustryId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-subIndustry-details-res-data', data.data);
        dispatch(subIndustryActions.getSubIndustrySuccess(data.data));
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
        dispatch(subIndustryActions.getSubIndustryFailure(errorMessage));
    }
};

export const createSubIndustry = (subIndustryData, token) => async (dispatch) => {
    try {
        console.log("create-subIndustryData", subIndustryData);
        dispatch(subIndustryActions.createSubIndustryRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(subIndustryData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = subIndustryData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: subIndustryData.avatarUri,
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
        console.log('create-subIndustry-res-data', data);
        dispatch(subIndustryActions.createSubIndustrySuccess(data.data));
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
        dispatch(subIndustryActions.createSubIndustryFailure(errorMessage));
    }
};

export const updateSubIndustry = (subIndustryData, token, subIndustryId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(subIndustryData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (subIndustryData?.avatarUri) {
        const fileName = subIndustryData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: subIndustryData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-subIndustryData%", subIndustryData,);
        console.log("update-subIndustryData%", formData,);
        dispatch(subIndustryActions.updateSubIndustryRequest());
        console.log("update url----------", `${route}/${subIndustryId}`);
        const data = await axios.put(
            `${route}/${subIndustryId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-subIndustry-res-data', data.data);
        dispatch(subIndustryActions.updateSubIndustrySuccess(data.data));
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
        dispatch(subIndustryActions.updateSubIndustryFailure(errorMessage));
    }
};

export const deleteSubIndustry = (subIndustryId, token) => async (dispatch) => {
    try {
        console.log("delete-subIndustryData", subIndustryId);
        dispatch(subIndustryActions.deleteSubIndustryRequest());

        const data = await axios.delete(
            `${route}/${subIndustryId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-subIndustry-res-data', data.data);
        dispatch(subIndustryActions.deleteSubIndustrySuccess(data.data));
    } catch (error) {
        console.log("delete-subIndustry-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(subIndustryActions.deleteSubIndustryFailure(errorMessage));
    }
};