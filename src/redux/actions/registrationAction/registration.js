import axios from "axios";
import { registrationActions } from "@/redux/slices/registrationSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/registration`

export const getAllRegistrations = (token) => async (dispatch) => {
    try {
        dispatch(registrationActions.getAllRegistrationsRequest());
        console.log('getAllRegistrations', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-all-registration-res-data', data.data);
        dispatch(registrationActions.getAllRegistrationsSuccess(data.data));
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
        dispatch(registrationActions.getAllRegistrationsFailure(errorMessage));
    }
};

export const getRegistration = (registrationId, token) => async (dispatch) => {
    try {
        console.log("get-registration-data", registrationId, token);
        dispatch(registrationActions.getRegistrationRequest());

        const data = await axios.get(`${route}/details/${registrationId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-registration-details-res-data', data.data);
        dispatch(registrationActions.getRegistrationSuccess(data.data));
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
        dispatch(registrationActions.getRegistrationFailure(errorMessage));
    }
};

export const createRegistration = (registrationData, token) => async (dispatch) => {
    try {
        console.log("create-registrationData", registrationData);
        dispatch(registrationActions.createRegistrationRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(registrationData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = registrationData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: registrationData.avatarUri,
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
        console.log('create-registration-res-data', data);
        dispatch(registrationActions.createRegistrationSuccess(data.data));
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
        dispatch(registrationActions.createRegistrationFailure(errorMessage));
    }
};

export const updateRegistration = (registrationData, token, registrationId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(registrationData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (registrationData?.avatarUri) {
        const fileName = registrationData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: registrationData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-registrationData%", registrationData,);
        console.log("update-registrationData%", formData,);
        dispatch(registrationActions.updateRegistrationRequest());
        console.log("update url----------", `${route}/${registrationId}`);
        const data = await axios.put(
            `${route}/${registrationId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-registration-res-data', data.data);
        dispatch(registrationActions.updateRegistrationSuccess(data.data));
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
        dispatch(registrationActions.updateRegistrationFailure(errorMessage));
    }
};

export const deleteRegistration = (registrationId, token) => async (dispatch) => {
    try {
        console.log("delete-registrationData", registrationId);
        dispatch(registrationActions.deleteRegistrationRequest());

        const data = await axios.delete(
            `${route}/${registrationId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-registration-res-data', data.data);
        dispatch(registrationActions.deleteRegistrationSuccess(data.data));
    } catch (error) {
        console.log("delete-registration-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(registrationActions.deleteRegistrationFailure(errorMessage));
    }
};