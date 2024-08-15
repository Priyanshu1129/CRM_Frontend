import axios from "axios";
import { relationshipDegreeActions } from "@/redux/slices/contactSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/relationshipDegree`

export const getAllRelationshipDegrees = (token) => async (dispatch) => {
    try {
        dispatch(relationshipDegreeActions.getAllRelationshipDegreesRequest());
        console.log('getAllRelationshipDegrees', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-all-relationshipDegree-res-data', data.data);
        dispatch(relationshipDegreeActions.getAllRelationshipDegreesSuccess(data.data));
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
        dispatch(relationshipDegreeActions.getAllRelationshipDegreesFailure(errorMessage));
    }
};

export const getRelationshipDegree = (relationshipDegreeId, token) => async (dispatch) => {
    try {
        console.log("get-relationshipDegree-data", relationshipDegreeId, token);
        dispatch(relationshipDegreeActions.getRelationshipDegreeRequest());

        const data = await axios.get(`${route}/details/${relationshipDegreeId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-relationshipDegree-details-res-data', data.data);
        dispatch(relationshipDegreeActions.getRelationshipDegreeSuccess(data.data));
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
        dispatch(relationshipDegreeActions.getRelationshipDegreeFailure(errorMessage));
    }
};

export const createRelationshipDegree = (relationshipDegreeData, token) => async (dispatch) => {
    try {
        console.log("create-relationshipDegreeData", relationshipDegreeData);
        dispatch(relationshipDegreeActions.createRelationshipDegreeRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(relationshipDegreeData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = relationshipDegreeData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: relationshipDegreeData.avatarUri,
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
        console.log('create-relationshipDegree-res-data', data);
        dispatch(relationshipDegreeActions.createRelationshipDegreeSuccess(data.data));
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
        dispatch(relationshipDegreeActions.createRelationshipDegreeFailure(errorMessage));
    }
};

export const updateRelationshipDegree = (relationshipDegreeData, token, relationshipDegreeId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(relationshipDegreeData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (relationshipDegreeData?.avatarUri) {
        const fileName = relationshipDegreeData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: relationshipDegreeData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-relationshipDegreeData%", relationshipDegreeData,);
        console.log("update-relationshipDegreeData%", formData,);
        dispatch(relationshipDegreeActions.updateRelationshipDegreeRequest());
        console.log("update url----------", `${route}/${relationshipDegreeId}`);
        const data = await axios.put(
            `${route}/${relationshipDegreeId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-relationshipDegree-res-data', data.data);
        dispatch(relationshipDegreeActions.updateRelationshipDegreeSuccess(data.data));
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
        dispatch(relationshipDegreeActions.updateRelationshipDegreeFailure(errorMessage));
    }
};

export const deleteRelationshipDegree = (relationshipDegreeId, token) => async (dispatch) => {
    try {
        console.log("delete-relationshipDegreeData", relationshipDegreeId);
        dispatch(relationshipDegreeActions.deleteRelationshipDegreeRequest());

        const data = await axios.delete(
            `${route}/${relationshipDegreeId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-relationshipDegree-res-data', data.data);
        dispatch(relationshipDegreeActions.deleteRelationshipDegreeSuccess(data.data));
    } catch (error) {
        console.log("delete-relationshipDegree-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(relationshipDegreeActions.deleteRelationshipDegreeFailure(errorMessage));
    }
};