import { createSlice } from '@reduxjs/toolkit';

const initialRegistrationState = {
    getRegistration: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllRegistrations: {
        status: "idle",
        error: null,
        data: null,
    },
    createRegistration: {
        status: "idle",
        error: null,
        data: null,
    },
    updateRegistration: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteRegistration: {
        status: "idle",
        error: null,
        data: null,
    }
}

const registrationSlice = createSlice({
    name: "registration",
    initialState: initialRegistrationState,
    reducers: {
        getRegistrationRequest: (state, action) => {
            state.getRegistration.status = 'pending'
        },
        getRegistrationSuccess: (state, action) => {
            state.getRegistration.status = 'success'
            state.getRegistration.data = action.payload;
        },
        getRegistrationFailure: (state, action) => {
            state.getRegistration.status = 'failed'
            state.getRegistration.error = action.payload;
        },
        getAllRegistrationsRequest: (state, action) => {
            state.getAllRegistrations.status = "pending";
        },
        getAllRegistrationsSuccess: (state, action) => {
            state.getAllRegistrations.status = 'success'
            state.getAllRegistrations.data = action.payload;
        },
        getAllRegistrationsFailure: (state, action) => {
            state.getAllRegistrations.status = 'failed';
        },
        createRegistrationRequest: (state, action) => {
            state.createRegistration.status = 'pending'
        },
        createRegistrationSuccess: (state, action) => {
            state.createRegistration.status = 'success'
            state.createRegistration.data = action.payload;
        },
        createRegistrationFailure: (state, action) => {
            state.createRegistration.status = 'failed'
            state.createRegistration.data = null
            state.createRegistration.error = action.payload;
        },
        updateRegistrationRequest: (state, action) => {
            state.updateRegistration.status = 'pending'
        },
        updateRegistrationSuccess: (state, action) => {
            state.updateRegistration.status = 'success'
            state.updateRegistration.data = action.payload
        },
        updateRegistrationFailure: (state, action) => {
            state.updateRegistration.status = 'failed'
            state.updateRegistration.error = action.payload
        },
        deleteRegistrationRequest: (state) => {
            state.deleteRegistration.status = 'pending'
        },
        deleteRegistrationSuccess: (state, action) => {
            state.deleteRegistration.status = 'success'
            state.deleteRegistration.data = action.payload
        },
        deleteRegistrationFailure: (state, action) => {
            state.deleteRegistration.status = 'failed'
            state.deleteRegistration.error = action.payload
        },
        clearGetRegistrationStatus: (state) => {
            state.getRegistration.status = "idle";
        },
        clearGetRegistrationData: () => {
            state.getRegistration.data = null;
        },
        clearGetRegistrationError: (state) => {
            state.getRegistration.error = null;
        },
        clearGetAllRegistrationsStatus: (state) => {
            state.getAllRegistrations.status = "idle";
        },
        clearGetAllRegistrationsData: () => {
            state.getAllRegistrations.data = null;
        },
        clearGetAllRegistrationsError: (state) => {
            state.getAllRegistrations.error = null;
        },
        clearCreateRegistrationStatus: (state) => {
            state.createRegistration.status = "idle";
        },
        clearCreateRegistrationData: () => {
            state.createRegistration.data = null;
        },
        clearCreateRegistrationError: (state) => {
            state.createRegistration.error = null;
        },
        clearUpdateRegistrationStatus: (state) => {
            state.updateRegistration.status = "idle";
        },
        clearUpdateRegistrationData: () => {
            state.updateRegistration.data = null;
        },
        clearUpdateRegistrationError: (state) => {
            state.updateRegistration.error = null;
        },
        clearDeleteRegistrationStatus: (state) => {
            state.deleteRegistration.status = "idle";
        },
        clearDeleteRegistrationData: () => {
            state.deleteRegistration.data = null;
        },
        clearDeleteRegistrationError: (state) => {
            state.deleteRegistration.error = null;
        },
    }
})

export const registrationActions = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;