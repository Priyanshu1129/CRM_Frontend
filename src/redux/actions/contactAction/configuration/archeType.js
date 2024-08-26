import axios from "axios";
import { archeTypeActions } from "@/redux/slices/contactSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/contact/config/archetype`

export const getAllArcheTypes = () => async (dispatch) => {
    try {
        dispatch(archeTypeActions.getAllArcheTypesRequest());
        console.log('getAllArcheTypes');
        const response = await axios.get(`${route}/`, {
            withCredentials: true,
        });

        console.log('get-all-archeType-res-data', response.data);
        dispatch(archeTypeActions.getAllArcheTypesSuccess(response.data));
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
        dispatch(archeTypeActions.getAllArcheTypesFailure(errorMessage));
    }
};

export const getArcheType = (archeTypeId, token) => async (dispatch) => {
    try {
        console.log("get-archeType-data", archeTypeId, token);
        dispatch(archeTypeActions.getArcheTypeRequest());

        const data = await axios.get(`${route}/details/${archeTypeId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-archeType-details-res-data', data.data);
        dispatch(archeTypeActions.getArcheTypeSuccess(data.data));
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
        dispatch(archeTypeActions.getArcheTypeFailure(errorMessage));
    }
};

export const createArcheType = (archeTypeData, token) => async (dispatch) => {
    try {
        console.log("create-archeTypeData", archeTypeData);
        dispatch(archeTypeActions.createArcheTypeRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(archeTypeData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = archeTypeData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: archeTypeData.avatarUri,
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
        console.log('create-archeType-res-data', data);
        dispatch(archeTypeActions.createArcheTypeSuccess(data.data));
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
        dispatch(archeTypeActions.createArcheTypeFailure(errorMessage));
    }
};

export const updateArcheType = (archeTypeData, token, archeTypeId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(archeTypeData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (archeTypeData?.avatarUri) {
        const fileName = archeTypeData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: archeTypeData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-archeTypeData%", archeTypeData,);
        console.log("update-archeTypeData%", formData,);
        dispatch(archeTypeActions.updateArcheTypeRequest());
        console.log("update url----------", `${route}/${archeTypeId}`);
        const data = await axios.put(
            `${route}/${archeTypeId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-archeType-res-data', data.data);
        dispatch(archeTypeActions.updateArcheTypeSuccess(data.data));
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
        dispatch(archeTypeActions.updateArcheTypeFailure(errorMessage));
    }
};

export const deleteArcheType = (archeTypeId, token) => async (dispatch) => {
    try {
        console.log("delete-archeTypeData", archeTypeId);
        dispatch(archeTypeActions.deleteArcheTypeRequest());

        const data = await axios.delete(
            `${route}/${archeTypeId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-archeType-res-data', data.data);
        dispatch(archeTypeActions.deleteArcheTypeSuccess(data.data));
    } catch (error) {
        console.log("delete-archeType-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(archeTypeActions.deleteArcheTypeFailure(errorMessage));
    }
};