import axios from "axios";
import { registrationStatusActions } from "@/redux/slices/registrationSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/registration/config/registration-status`

export const getAllRegistrationStatus = () => async (dispatch) => {
    try {
        dispatch(registrationStatusActions.getAllRegistrationStatusRequest());
        console.log('getAllRegistrationStatus');
        const response = await axios.get(`${route}/`);

        console.log('get-all-registrationStatus-res-data', response.data);
        dispatch(registrationStatusActions.getAllRegistrationStatusSuccess(response.data));
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
        dispatch(registrationStatusActions.getAllRegistrationStatusFailure(errorMessage));
    }
};

export const getRegistrationStatus = (registrationStatusId, token) => async (dispatch) => {
    try {
        console.log("get-registrationStatus-data", registrationStatusId, token);
        dispatch(registrationStatusActions.getRegistrationStatusRequest());

        const data = await axios.get(`${route}/details/${registrationStatusId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-registrationStatus-details-res-data', data.data);
        dispatch(registrationStatusActions.getRegistrationStatusSuccess(data.data));
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
        dispatch(registrationStatusActions.getRegistrationStatusFailure(errorMessage));
    }
};

export const createRegistrationStatus = (registrationStatusData, token) => async (dispatch) => {
    try {
        console.log("create-registrationStatusData", registrationStatusData);
        dispatch(registrationStatusActions.createRegistrationStatusRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(registrationStatusData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = registrationStatusData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: registrationStatusData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });

        console.log("form-data-----before")
        console.log("form-data-----", formData)

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
        console.log('create-registrationStatus-res-data', data);
        dispatch(registrationStatusActions.createRegistrationStatusSuccess(data.data));
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
        dispatch(registrationStatusActions.createRegistrationStatusFailure(errorMessage));
    }
};

export const updateRegistrationStatus = (registrationStatusData, token, registrationStatusId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(registrationStatusData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (registrationStatusData?.avatarUri) {
        const fileName = registrationStatusData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: registrationStatusData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-registrationStatusData%", registrationStatusData,);
        console.log("update-registrationStatusData%", formData,);
        dispatch(registrationStatusActions.updateRegistrationStatusRequest());
        console.log("update url----------", `${route}/${registrationStatusId}`);
        const data = await axios.put(
            `${route}/${registrationStatusId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-registrationStatus-res-data', data.data);
        dispatch(registrationStatusActions.updateRegistrationStatusSuccess(data.data));
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
        dispatch(registrationStatusActions.updateRegistrationStatusFailure(errorMessage));
    }
};

export const deleteRegistrationStatus = (registrationStatusId, token) => async (dispatch) => {
    try {
        console.log("delete-registrationStatusData", registrationStatusId);
        dispatch(registrationStatusActions.deleteRegistrationStatusRequest());

        const data = await axios.delete(
            `${route}/${registrationStatusId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-registrationStatus-res-data', data.data);
        dispatch(registrationStatusActions.deleteRegistrationStatusSuccess(data.data));
    } catch (error) {
        console.log("delete-registrationStatus-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(registrationStatusActions.deleteRegistrationStatusFailure(errorMessage));
    }
};