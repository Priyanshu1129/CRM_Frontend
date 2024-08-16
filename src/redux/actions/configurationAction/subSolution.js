import axios from "axios";
import { subSolutionActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/sub-solution`

export const getAllSubSolutions = () => async (dispatch) => {
    try {
        dispatch(subSolutionActions.getAllSubSolutionsRequest());
        console.log('getAllSubSolutions');
        const response = await axios.get(`${route}/`);

        console.log('get-all-subSolution-res-data', response.data);
        dispatch(subSolutionActions.getAllSubSolutionsSuccess(response.data));
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(subSolutionActions.getAllSubSolutionsFailure(errorMessage));
    }
};

export const getSubSolution = (subSolutionId, token) => async (dispatch) => {
    try {
        console.log("get-subSolution-data", subSolutionId, token);
        dispatch(subSolutionActions.getSubSolutionRequest());

        const data = await axios.get(`${route}/details/${subSolutionId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-subSolution-details-res-data', data.data);
        dispatch(subSolutionActions.getSubSolutionSuccess(data.data));
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
        dispatch(subSolutionActions.getSubSolutionFailure(errorMessage));
    }
};

export const createSubSolution = (subSolutionData, token) => async (dispatch) => {
    try {
        console.log("create-subSolutionData", subSolutionData);
        dispatch(subSolutionActions.createSubSolutionRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(subSolutionData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = subSolutionData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: subSolutionData.avatarUri,
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
        console.log('create-subSolution-res-data', data);
        dispatch(subSolutionActions.createSubSolutionSuccess(data.data));
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
        dispatch(subSolutionActions.createSubSolutionFailure(errorMessage));
    }
};

export const updateSubSolution = (subSolutionData, token, subSolutionId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(subSolutionData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (subSolutionData?.avatarUri) {
        const fileName = subSolutionData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: subSolutionData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-subSolutionData%", subSolutionData,);
        console.log("update-subSolutionData%", formData,);
        dispatch(subSolutionActions.updateSubSolutionRequest());
        console.log("update url----------", `${route}/${subSolutionId}`);
        const data = await axios.put(
            `${route}/${subSolutionId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-subSolution-res-data', data.data);
        dispatch(subSolutionActions.updateSubSolutionSuccess(data.data));
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
        dispatch(subSolutionActions.updateSubSolutionFailure(errorMessage));
    }
};

export const deleteSubSolution = (subSolutionId, token) => async (dispatch) => {
    try {
        console.log("delete-subSolutionData", subSolutionId);
        dispatch(subSolutionActions.deleteSubSolutionRequest());

        const data = await axios.delete(
            `${route}/${subSolutionId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-subSolution-res-data', data.data);
        dispatch(subSolutionActions.deleteSubSolutionSuccess(data.data));
    } catch (error) {
        console.log("delete-subSolution-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(subSolutionActions.deleteSubSolutionFailure(errorMessage));
    }
};