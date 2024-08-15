import axios from "axios";
import { salesSubStageActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "../../config/config";

const route = `${serverURL}/configuration/salesSubStage`

export const getAllSalesSubStages = (token) => async (dispatch) => {
    try {
        dispatch(salesSubStageActions.getAllSalesSubStagesRequest());
        console.log('getAllSalesSubStages', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-all-salesSubStage-res-data', data.data);
        dispatch(salesSubStageActions.getAllSalesSubStagesSuccess(data.data));
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
        dispatch(salesSubStageActions.getAllSalesSubStagesFailure(errorMessage));
    }
};

export const getSalesSubStage = (salesSubStageId, token) => async (dispatch) => {
    try {
        console.log("get-salesSubStage-data", salesSubStageId, token);
        dispatch(salesSubStageActions.getSalesSubStageRequest());

        const data = await axios.get(`${route}/details/${salesSubStageId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-salesSubStage-details-res-data', data.data);
        dispatch(salesSubStageActions.getSalesSubStageSuccess(data.data));
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
        dispatch(salesSubStageActions.getSalesSubStageFailure(errorMessage));
    }
};

export const createSalesSubStage = (salesSubStageData, token) => async (dispatch) => {
    try {
        console.log("create-salesSubStageData", salesSubStageData);
        dispatch(salesSubStageActions.createSalesSubStageRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(salesSubStageData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = salesSubStageData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: salesSubStageData.avatarUri,
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
        console.log('create-salesSubStage-res-data', data);
        dispatch(salesSubStageActions.createSalesSubStageSuccess(data.data));
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
        dispatch(salesSubStageActions.createSalesSubStageFailure(errorMessage));
    }
};

export const updateSalesSubStage = (salesSubStageData, token, salesSubStageId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(salesSubStageData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (salesSubStageData?.avatarUri) {
        const fileName = salesSubStageData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: salesSubStageData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-salesSubStageData%", salesSubStageData,);
        console.log("update-salesSubStageData%", formData,);
        dispatch(salesSubStageActions.updateSalesSubStageRequest());
        console.log("update url----------", `${route}/${salesSubStageId}`);
        const data = await axios.put(
            `${route}/${salesSubStageId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-salesSubStage-res-data', data.data);
        dispatch(salesSubStageActions.updateSalesSubStageSuccess(data.data));
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
        dispatch(salesSubStageActions.updateSalesSubStageFailure(errorMessage));
    }
};

export const deleteSalesSubStage = (salesSubStageId, token) => async (dispatch) => {
    try {
        console.log("delete-salesSubStageData", salesSubStageId);
        dispatch(salesSubStageActions.deleteSalesSubStageRequest());

        const data = await axios.delete(
            `${route}/${salesSubStageId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-salesSubStage-res-data', data.data);
        dispatch(salesSubStageActions.deleteSalesSubStageSuccess(data.data));
    } catch (error) {
        console.log("delete-salesSubStage-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(salesSubStageActions.deleteSalesSubStageFailure(errorMessage));
    }
};