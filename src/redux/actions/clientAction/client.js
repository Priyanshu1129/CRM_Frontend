import axios from "axios";
import { clientActions } from "@/redux/slices/clientSlice";
import { serverURL } from "@/config/config";


const route = `${serverURL}/client`

export const getAllClients = () => async (dispatch) => {
    try {
        dispatch(clientActions.getAllClientsRequest());
        console.log('getAllClients-request');
        const data = await axios.get(`${route}/`);

        console.log('get-all-client-res-data', data.data);
        dispatch(clientActions.getAllClientsSuccess(data.data));
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
        dispatch(clientActions.getAllClientsFailure(errorMessage));
    }
};

export const getClient = (clientId, token) => async (dispatch) => {
    try {
        console.log("get-client-data", clientId, token);
        dispatch(clientActions.getClientRequest());

        const data = await axios.get(`${route}/details/${clientId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-client-details-res-data', data.data);
        dispatch(clientActions.getClientSuccess(data.data));
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

export const updateClient = (clientData, token, clientId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(clientData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (clientData?.avatarUri) {
        const fileName = clientData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: clientData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-clientData%", clientData,);
        console.log("update-clientData%", formData,);
        dispatch(clientActions.updateClientRequest());
        console.log("update url----------", `${route}/${clientId}`);
        const data = await axios.put(
            `${route}/${clientId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-client-res-data', data.data);
        dispatch(clientActions.updateClientSuccess(data.data));
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
                    "authorization": token
                },
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