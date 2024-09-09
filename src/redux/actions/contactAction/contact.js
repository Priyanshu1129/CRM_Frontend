import axios from "axios";
import { contactActions } from "@/redux/slices/contactSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/contact`

export const getAllContacts = ({ page = null, limit = null, config = false, entryDate = "", enteredBy = "", territory = "", client = "" }) => async (dispatch) => {
    try {
        if (config) {
            dispatch(mastersConfigActions.getConfigContactsRequest());
        } else {
            dispatch(contactActions.getAllContactsRequest());
        }
        console.log('getAllContactsRequest Config', config);
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config, enteredBy, territory, client, entry_date: entryDate },
            withCredentials: true,
        });

        console.log('get-all-contact-res-data', response.data);
        if (config) {
            dispatch(mastersConfigActions.getConfigContactsSuccess(response.data.data));
        } else {
            dispatch(contactActions.getAllContactsSuccess(response.data.data));
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
            dispatch(mastersConfigActions.getConfigContactsFailure());
        } else {
            dispatch(contactActions.getAllContactsFailure(errorMessage));
        }
    }
};

export const getContact = (contactId) => async (dispatch) => {
    try {
        console.log("get-contact-data", contactId);
        dispatch(contactActions.getContactRequest());

        const response = await axios.get(`${route}/${contactId}`, {
            withCredentials: true,
        });
        console.log('get-contact-details-res-data', response.data);
        dispatch(contactActions.getContactSuccess(response.data));
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
        dispatch(contactActions.getContactFailure(errorMessage));
    }
};

export const createContact = (contactData) => async (dispatch) => {
    try {
        console.log("create-contactData", contactData);
        dispatch(contactActions.createContactRequest());

        const response = await axios.post(
            `${route}/`,
            contactData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        console.log('create-contact-res-data', response);
        dispatch(contactActions.createContactSuccess(response.data));
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
        dispatch(contactActions.createContactFailure(errorMessage));
    }
};

export const updateContact = (contactData, contactId) => async (dispatch) => {

    try {
        console.log("update-contactData-req", contactData);
        dispatch(contactActions.updateContactRequest());
        const response = await axios.put(
            `${route}/${contactId}`,
            contactData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            }
        );
        console.log('update-contact-res-data', response.data);
        dispatch(contactActions.getContactSuccess(response.data));
        dispatch(contactActions.updateContactSuccess(response.data));
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
        dispatch(contactActions.updateContactFailure(errorMessage));
    }
};

export const deleteContact = (contactId, token) => async (dispatch) => {
    try {
        console.log("delete-contactData", contactId);
        dispatch(contactActions.deleteContactRequest());

        const data = await axios.delete(
            `${route}/${contactId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        console.log('delete-contact-res-data', data.data);
        dispatch(contactActions.deleteContactSuccess(data.data));
    } catch (error) {
        console.log("delete-contact-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(contactActions.deleteContactFailure(errorMessage));
    }
};