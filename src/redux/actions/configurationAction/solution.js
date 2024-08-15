import axios from "axios";
import { solutionActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "../../config/config";

const route = `${serverURL}/configuration/solution`

export const getAllSolutions = (token) => async (dispatch) => {
    try {
        dispatch(solutionActions.getAllSolutionsRequest());
        console.log('getAllSolutions', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-all-solution-res-data', data.data);
        dispatch(solutionActions.getAllSolutionsSuccess(data.data));
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
        dispatch(solutionActions.getAllSolutionsFailure(errorMessage));
    }
};

export const getSolution = (solutionId, token) => async (dispatch) => {
    try {
        console.log("get-solution-data", solutionId, token);
        dispatch(solutionActions.getSolutionRequest());

        const data = await axios.get(`${route}/details/${solutionId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-solution-details-res-data', data.data);
        dispatch(solutionActions.getSolutionSuccess(data.data));
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
        dispatch(solutionActions.getSolutionFailure(errorMessage));
    }
};

export const createSolution = (solutionData, token) => async (dispatch) => {
    try {
        console.log("create-solutionData", solutionData);
        dispatch(solutionActions.createSolutionRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(solutionData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = solutionData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: solutionData.avatarUri,
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
        console.log('create-solution-res-data', data);
        dispatch(solutionActions.createSolutionSuccess(data.data));
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
        dispatch(solutionActions.createSolutionFailure(errorMessage));
    }
};

export const updateSolution = (solutionData, token, solutionId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(solutionData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (solutionData?.avatarUri) {
        const fileName = solutionData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: solutionData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-solutionData%", solutionData,);
        console.log("update-solutionData%", formData,);
        dispatch(solutionActions.updateSolutionRequest());
        console.log("update url----------", `${route}/${solutionId}`);
        const data = await axios.put(
            `${route}/${solutionId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-solution-res-data', data.data);
        dispatch(solutionActions.updateSolutionSuccess(data.data));
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
        dispatch(solutionActions.updateSolutionFailure(errorMessage));
    }
};

export const deleteSolution = (solutionId, token) => async (dispatch) => {
    try {
        console.log("delete-solutionData", solutionId);
        dispatch(solutionActions.deleteSolutionRequest());

        const data = await axios.delete(
            `${route}/${solutionId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-solution-res-data', data.data);
        dispatch(solutionActions.deleteSolutionSuccess(data.data));
    } catch (error) {
        console.log("delete-solution-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(solutionActions.deleteSolutionFailure(errorMessage));
    }
};