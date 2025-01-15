import { createSlice } from "@reduxjs/toolkit";

const initialContactState = {
  getContact: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllContacts: {
    status: "idle",
    error: null,
    data: null,
  },
  createContact: {
    status: "idle",
    error: null,
    data: null,
  },
  updateContact: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteContact: {
    status: "idle",
    error: null,
    data: null,
  },
};

const contactSlice = createSlice({
  name: "contact",
  initialState: initialContactState,
  reducers: {
    getContactRequest: (state, action) => {
      state.getContact.status = "pending";
    },
    getContactSuccess: (state, action) => {
      state.getContact.status = "success";
      state.getContact.data = action.payload;
    },
    getContactFailure: (state, action) => {
      state.getContact.status = "failed";
      state.getContact.error = action.payload;
    },
    getAllContactsRequest: (state, action) => {
      state.getAllContacts.status = "pending";
    },
    getAllContactsSuccess: (state, action) => {
      state.getAllContacts.status = "success";
      state.getAllContacts.data = action.payload;
    },
    getAllContactsFailure: (state, action) => {
      state.getAllContacts.status = "failed";
      state.getAllContacts.error = action.payload;
    },
    createContactRequest: (state, action) => {
      state.createContact.status = "pending";
    },
    createContactSuccess: (state, action) => {
      state.createContact.status = "success";
      state.createContact.data = action.payload;
    },
    createContactFailure: (state, action) => {
      state.createContact.status = "failed";
      state.createContact.data = null;
      state.createContact.error = action.payload;
    },
    updateContactRequest: (state, action) => {
      state.updateContact.status = "pending";
    },
    updateContactSuccess: (state, action) => {
      state.updateContact.status = "success";
      state.updateContact.data = action.payload;
    },
    updateContactFailure: (state, action) => {
      state.updateContact.status = "failed";
      state.updateContact.error = action.payload;
    },
    deleteContactRequest: (state) => {
      state.deleteContact.status = "pending";
    },
    deleteContactSuccess: (state, action) => {
      state.deleteContact.status = "success";
      state.deleteContact.data = action.payload;
    },
    deleteContactFailure: (state, action) => {
      state.deleteContact.status = "failed";
      state.deleteContact.error = action.payload;
    },
    clearGetContactStatus: (state) => {
      state.getContact.status = "idle";
    },
    clearGetContactData: () => {
      state.getContact.data = null;
    },
    clearGetContactError: (state) => {
      state.getContact.error = null;
    },
    clearGetAllContactsStatus: (state) => {
      state.getAllContacts.status = "idle";
    },
    clearGetAllContactsData: () => {
      state.getAllContacts.data = null;
    },
    clearGetAllContactsError: (state) => {
      state.getAllContacts.error = null;
    },
    clearCreateContactStatus: (state) => {
      state.createContact.status = "idle";
    },
    clearCreateContactData: () => {
      state.createContact.data = null;
    },
    clearCreateContactError: (state) => {
      state.createContact.error = null;
    },
    clearUpdateContactStatus: (state) => {
      state.updateContact.status = "idle";
    },
    clearUpdateContactData: () => {
      state.updateContact.data = null;
    },
    clearUpdateContactError: (state) => {
      state.updateContact.error = null;
    },
    clearDeleteContactStatus: (state) => {
      state.deleteContact.status = "idle";
    },
    clearDeleteContactData: () => {
      state.deleteContact.data = null;
    },
    clearDeleteContactError: (state) => {
      state.deleteContact.error = null;
    },
    updateContactList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure `state.getAllUsers.data.users` exists and is an array
      if (!Array.isArray(state.getAllContacts?.data?.contacts)) {
        state.getAllContacts.data = {
          ...state.getAllContacts.data,
          contacts: [],
          totalCount: 0,
        };
      }

      switch (type) {
        case "add": {
          state.getAllContacts.data.contacts = [
            payload,
            ...state.getAllContacts.data.contacts,
          ];
          state.getAllContacts.data.totalCount++;
          break;
        }

        case "update": {
          const index = state.getAllContacts.data.contacts.findIndex(
            (contact) => contact._id.toString() === payload._id.toString()
          );
          if (index !== -1) {
            state.getAllContacts.data.contacts[index] = payload;
          }
          break;
        }

        case "delete": {
          state.getAllContacts.data.contacts =
            state.getAllContacts.data.contacts.filter(
              (contact) => contact._id.toString() !== payload._id.toString()
            );
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const contactActions = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
