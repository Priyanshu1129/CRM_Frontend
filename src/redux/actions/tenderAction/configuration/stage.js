import axios from "axios";
import { stageActions } from "@/redux/slices/tenderSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/tender/config/stage`

export const getAllStages = () => async (dispatch) => {
    try {
        dispatch(stageActions.getAllStagesRequest());
        console.log('getAllStages');
        const response = await axios.get(`${route}/`);

        console.log('get-all-stage-res-data', response.data);
        dispatch(stageActions.getAllStagesSuccess(response.data));
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
        dispatch(stageActions.getAllStagesFailure(errorMessage));
    }
};

export const getStage = (stageId, token) => async (dispatch) => {
    try {
        console.log("get-stage-data", stageId, token);
        dispatch(stageActions.getStageRequest());

        const data = await axios.get(`${route}/details/${stageId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-stage-details-res-data', data.data);
        dispatch(stageActions.getStageSuccess(data.data));
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
        dispatch(stageActions.getStageFailure(errorMessage));
    }
};

export const createStage = (stageData, token) => async (dispatch) => {
    try {
        console.log("create-stageData", stageData);
        dispatch(stageActions.createStageRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(stageData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = stageData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: stageData.avatarUri,
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
        console.log('create-stage-res-data', data);
        dispatch(stageActions.createStageSuccess(data.data));
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
        dispatch(stageActions.createStageFailure(errorMessage));
    }
};

export const updateStage = (stageData, token, stageId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(stageData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (stageData?.avatarUri) {
        const fileName = stageData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: stageData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-stageData%", stageData,);
        console.log("update-stageData%", formData,);
        dispatch(stageActions.updateStageRequest());
        console.log("update url----------", `${route}/${stageId}`);
        const data = await axios.put(
            `${route}/${stageId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-stage-res-data', data.data);
        dispatch(stageActions.updateStageSuccess(data.data));
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
        dispatch(stageActions.updateStageFailure(errorMessage));
    }
};

export const deleteStage = (stageId, token) => async (dispatch) => {
    try {
        console.log("delete-stageData", stageId);
        dispatch(stageActions.deleteStageRequest());

        const data = await axios.delete(
            `${route}/${stageId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-stage-res-data', data.data);
        dispatch(stageActions.deleteStageSuccess(data.data));
    } catch (error) {
        console.log("delete-stage-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(stageActions.deleteStageFailure(errorMessage));
    }
};