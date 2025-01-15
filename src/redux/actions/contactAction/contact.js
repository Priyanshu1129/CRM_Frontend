import { axiosRequest } from "@/utilities/axiosHelper";
import { contactActions } from "@/redux/slices/contactSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/contact`;
export const getAllContacts =
  ({
    page = null,
    limit = null,
    config = false,
    entryDate = "",
    enteredBy = "",
    territory = "",
    client = "",
  }) =>
  async (dispatch) => {
    try {
      // Dispatch request action based on config flag
      if (config) {
        dispatch(mastersConfigActions.getConfigContactsRequest());
      } else {
        dispatch(contactActions.getAllContactsRequest());
      }

      console.log("getAllContactsRequest Config", config);

      // Prepare the query parameters
      const params = {
        limit,
        page,
        config,
        enteredBy,
        territory,
        client,
        entry_date: entryDate,
      };

      // Use axiosRequest helper function for GET request
      const data = await axiosRequest(
        dispatch,
        "GET", // HTTP method for GET request
        `${route}/`, // URL for getting contacts
        null, // No body for GET request
        params // Query parameters for filtering
      );

      console.log("get-all-contact-res-data", data);

      // Dispatch success action based on config flag
      if (config) {
        dispatch(mastersConfigActions.getConfigContactsSuccess(data.data));
      } else {
        dispatch(contactActions.getAllContactsSuccess(data.data));
      }
    } catch (error) {
      console.log("error", error);
      // Dispatch failure action based on config flag
      if (config) {
        dispatch(mastersConfigActions.getConfigContactsFailure());
      } else {
        dispatch(
          contactActions.getAllContactsFailure(
            error.message || "Failed to fetch contacts"
          )
        );
      }
    }
  };
export const getContact = (contactId) => async (dispatch) => {
  try {
    console.log("get-contact-data", contactId);
    dispatch(contactActions.getContactRequest());

    // Use axiosRequest helper function for GET request
    const data = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/${contactId}`, // URL for getting the contact by ID
      null // No body for GET request
    );
    console.log("get-contact-details-res-data", data);
    dispatch(contactActions.getContactSuccess(data));
  } catch (error) {
    console.log("error", error);
    let errorMessage = error.message || "An error occurred";
    dispatch(contactActions.getContactFailure(errorMessage));
  }
};

export const createContact = (contactData) => async (dispatch) => {
  try {
    console.log("create-contact-req-data", contactData);
    dispatch(contactActions.createContactRequest());

    // Use axiosRequest helper function for POST request (multipart form data)
    const data = await axiosRequest(
      dispatch,
      "POST", // HTTP method for POST request
      `${route}/`, // URL for creating a new contact
      contactData // Body containing contact data
    );
    console.log("create-contact-res-data", data);
    dispatch(contactActions.createContactSuccess(data));
  } catch (error) {
    console.log("error", error);
    let errorMessage = error.message || "An error occurred";
    dispatch(contactActions.createContactFailure(errorMessage));
  }
};

export const updateContact = (contactData, contactId) => async (dispatch) => {
  try {
    console.log("update-contactData-req", contactData);
    dispatch(contactActions.updateContactRequest());

    // Use axiosRequest helper function for PUT request (multipart form data)
    const data = await axiosRequest(
      dispatch,
      "PUT", // HTTP method for PUT request
      `${route}/${contactId}`, // URL for updating the contact by ID
      contactData // Body containing contact data
    );
    console.log("update-contact-res-data", data);
    dispatch(contactActions.getContactSuccess(data));
    dispatch(contactActions.updateContactSuccess(data));
  } catch (error) {
    console.log("error", error);
    let errorMessage = error.message || "An error occurred";
    dispatch(contactActions.updateContactFailure(errorMessage));
  }
};

export const deleteContact = (contactId, confirm = 'false') => async (dispatch) => {
  try {
    console.log("delete-contactData", contactId);
    dispatch(contactActions.deleteContactRequest());

    // Use axiosRequest helper function for DELETE request
    const data = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for DELETE request
      `${route}/${contactId}?confirm=${confirm}` // URL for deleting the contact by ID
    );
    console.log("delete-contact-res-data", data);
    dispatch(contactActions.deleteContactSuccess(data));
  } catch (error) {
    console.log("delete-contact-error", error);
    let errorMessage = error.message || "An error occurred";
    dispatch(contactActions.deleteContactFailure(errorMessage));
  }
};
