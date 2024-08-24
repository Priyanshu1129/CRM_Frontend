import axios from "axios";
import { clientActions } from "@/redux/slices/clientSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";

const route = `${serverURL}/client`

export const getAllClients = ({ page = null, limit = null, config = false }) => async (dispatch) => {
    try {
        if (config) {
            dispatch(mastersConfigActions.getConfigClientsRequest());
        } else {
            dispatch(clientActions.getAllClientsRequest());
        }
        console.log('getAllClients-request-config', config);
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config },
            withCredentials: true,
        });

        console.log('get-all-client-res-data', response.data);
        if (config) {
            dispatch(mastersConfigActions.getConfigClientsSuccess(response.data));
        } else {
            dispatch(clientActions.getAllClientsSuccess(response.data.data));
        }
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
        if (config) {
            dispatch(mastersConfigActions.getConfigClientsFailure());
        } else {
            dispatch(clientActions.getAllClientsFailure(errorMessage));
        }
    }
};

export const getClient = (clientId) => async (dispatch) => {
    try {
        console.log("get-client-data-req", clientId);
        dispatch(clientActions.getClientRequest());

        const response = await axios.get(`${route}/${clientId}`, {
            withCredentials: true,
        });
        console.log('get-client-data-res', response.data);
        dispatch(clientActions.getClientSuccess(response.data));
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
        dispatch(clientActions.getClientFailure(errorMessage));
    }
};

export const createClient = (clientData) => async (dispatch) => {
    try {
        console.log("create-client-req-data", clientData);
        dispatch(clientActions.createClientRequest());

        const response = await axios.post(
            `${route}/`,
            clientData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        console.log('create-client-res-data', response);
        dispatch(clientActions.createClientSuccess(response.data));
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
        dispatch(clientActions.createClientFailure(errorMessage));
    }
};

export const updateClient = (clientData, clientId) => async (dispatch) => {

    try {
        console.log("update-client-req-data", clientData);
        dispatch(clientActions.updateClientRequest());
        const response = await axios.put(
            `${route}/${clientId}`,
            clientData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        console.log('update-client-res-data', response.data);
        dispatch(clientActions.getClientSuccess(response.data));
        dispatch(clientActions.updateClientSuccess(response.data));
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
        dispatch(clientActions.updateClientFailure(errorMessage));
    }
};

export const deleteClient = (clientId, token) => async (dispatch) => {
    try {
        console.log("delete-clientData", clientId);
        dispatch(clientActions.deleteClientRequest());

        const data = await axios.delete(
            `${route}/${clientId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        console.log('delete-client-res-data', data.data);
        dispatch(clientActions.deleteClientSuccess(data.data));
    } catch (error) {
        console.log("delete-client-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(clientActions.deleteClientFailure(errorMessage));
    }
};
