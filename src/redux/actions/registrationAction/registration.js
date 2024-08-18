import axios from "axios";
import { registrationActions } from "@/redux/slices/registrationSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/registration`

export const getAllRegistrations = () => async (dispatch) => {
    try {
        dispatch(registrationActions.getAllRegistrationsRequest());
        console.log('getAllRegistrations');
        const response = await axios.get(`${route}/`, {
            // headers: {
            //     "authorization": token
            // }
        });

        console.log('get-all-registration-res-data', response.data);
        dispatch(registrationActions.getAllRegistrationsSuccess(response.data));
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

export const createRegistration = (registrationData) => async (dispatch) => {
    try {
        console.log("create-registrationData", registrationData);
        dispatch(registrationActions.createRegistrationRequest());

        const response = await axios.post(
            `${route}/`,
            registrationData,
            {
                headers: {
                    // "authorization": token
                },
            }
        );
        console.log('create-registration-res-data', response.data);
        dispatch(registrationActions.createRegistrationSuccess(response.data));
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