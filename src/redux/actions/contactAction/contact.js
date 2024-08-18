import axios from "axios";
import { contactActions } from "@/redux/slices/contactSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/contact`

export const getAllContacts = () => async (dispatch) => {
    try {
        dispatch(contactActions.getAllContactsRequest());
        console.log('getAllContacts');
        const response = await axios.get(`${route}/`);

        console.log('get-all-contact-res-data', response.data);
        dispatch(contactActions.getAllContactsSuccess(response.data));
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
        dispatch(contactActions.getAllContactsFailure(errorMessage));
    }
};

export const getContact = (contactId, token) => async (dispatch) => {
    try {
        console.log("get-contact-data", contactId, token);
        dispatch(contactActions.getContactRequest());

        const data = await axios.get(`${route}/details/${contactId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-contact-details-res-data', data.data);
        dispatch(contactActions.getContactSuccess(data.data));
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
                    // "Content-Type": "multipart/form-data",
                    // "authorization": token
                },
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

export const updateContact = (contactData, token, contactId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(contactData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (contactData?.avatarUri) {
        const fileName = contactData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: contactData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-contactData%", contactData,);
        console.log("update-contactData%", formData,);
        dispatch(contactActions.updateContactRequest());
        console.log("update url----------", `${route}/${contactId}`);
        const data = await axios.put(
            `${route}/${contactId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-contact-res-data', data.data);
        dispatch(contactActions.updateContactSuccess(data.data));
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
                    "authorization": token
                },
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