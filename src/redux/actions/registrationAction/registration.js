import axios from "axios";
import { registrationActions } from "@/redux/slices/registrationSlice"
import { serverURL } from "@/config/config";
const route = `${serverURL}/registration`

export const getAllRegistrations = ({ page = null, limit = null, config = false, entryDate = "", enteredBy = "" }) => async (dispatch) => {
    try {
        dispatch(registrationActions.getAllRegistrationsRequest());
        console.log('getAllRegistrations');
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config, enteredBy, entryDate },
            withCredentials: true,
        });

        console.log('get-all-registration-res-data', response.data);
        dispatch(registrationActions.getAllRegistrationsSuccess(response.data.data));
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

export const getRegistration = (registrationId) => async (dispatch) => {
    try {
        console.log("get-registration-data", registrationId);
        dispatch(registrationActions.getRegistrationRequest());

        const response = await axios.get(`${route}/${registrationId}`, {
            withCredentials: true,
        });
        console.log('get-registration-details-res-data', response.data);
        dispatch(registrationActions.getRegistrationSuccess(response.data));
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
                withCredentials: true,
            }
        );
        console.log('create-registration-res-data', response.data);
        dispatch(registrationActions.createRegistrationSuccess(response.data.data));
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

export const updateRegistration = (registrationData, registrationId) => async (dispatch) => {

    try {
        console.log("update-registrationData-req", registrationData,);
        dispatch(registrationActions.updateRegistrationRequest());
        const response = await axios.put(
            `${route}/${registrationId}`, registrationData, {
            withCredentials: true,
        });
        console.log('update-registration-res-data', response.data);
        dispatch(registrationActions.getRegistrationSuccess(response.data));
        dispatch(registrationActions.updateRegistrationSuccess(response.data));
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
                },
                withCredentials: true,
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