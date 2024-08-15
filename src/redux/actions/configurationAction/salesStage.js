import axios from "axios";
import { salesStageActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/sales-stage`

export const getAllSalesStages = () => async (dispatch) => {
    try {
        dispatch(salesStageActions.getAllSalesStagesRequest());
        console.log('getAllSalesStages');
        const response = await axios.get(`${route}/`);

        console.log('get-all-salesStage-res-data', response.data);
        dispatch(salesStageActions.getAllSalesStagesSuccess(response.data));
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
        dispatch(salesStageActions.getAllSalesStagesFailure(errorMessage));
    }
};

export const getSalesStage = (salesStageId, token) => async (dispatch) => {
    try {
        console.log("get-salesStage-data", salesStageId, token);
        dispatch(salesStageActions.getSalesStageRequest());

        const data = await axios.get(`${route}/details/${salesStageId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-salesStage-details-res-data', data.data);
        dispatch(salesStageActions.getSalesStageSuccess(data.data));
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
        dispatch(salesStageActions.getSalesStageFailure(errorMessage));
    }
};

export const createSalesStage = (salesStageData, token) => async (dispatch) => {
    try {
        console.log("create-salesStageData", salesStageData);
        dispatch(salesStageActions.createSalesStageRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(salesStageData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = salesStageData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: salesStageData.avatarUri,
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
        console.log('create-salesStage-res-data', data);
        dispatch(salesStageActions.createSalesStageSuccess(data.data));
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
        dispatch(salesStageActions.createSalesStageFailure(errorMessage));
    }
};

export const updateSalesStage = (salesStageData, token, salesStageId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(salesStageData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (salesStageData?.avatarUri) {
        const fileName = salesStageData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: salesStageData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-salesStageData%", salesStageData,);
        console.log("update-salesStageData%", formData,);
        dispatch(salesStageActions.updateSalesStageRequest());
        console.log("update url----------", `${route}/${salesStageId}`);
        const data = await axios.put(
            `${route}/${salesStageId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-salesStage-res-data', data.data);
        dispatch(salesStageActions.updateSalesStageSuccess(data.data));
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
        dispatch(salesStageActions.updateSalesStageFailure(errorMessage));
    }
};

export const deleteSalesStage = (salesStageId, token) => async (dispatch) => {
    try {
        console.log("delete-salesStageData", salesStageId);
        dispatch(salesStageActions.deleteSalesStageRequest());

        const data = await axios.delete(
            `${route}/${salesStageId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-salesStage-res-data', data.data);
        dispatch(salesStageActions.deleteSalesStageSuccess(data.data));
    } catch (error) {
        console.log("delete-salesStage-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(salesStageActions.deleteSalesStageFailure(errorMessage));
    }
};