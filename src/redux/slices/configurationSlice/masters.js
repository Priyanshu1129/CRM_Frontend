import { createSlice } from '@reduxjs/toolkit';

const initialMastersConfigState = {
    getConfigClients: {
        status: "idle",
        error: null,
        data: null,
    },
    getConfigContacts: {
        status: "idle",
        error: null,
        data: null,
    },
    getConfigOpportunities: {
        status: "idle",
        error: null,
        data: null,
    },
    getConfigTenders: {
        status: "idle",
        error: null,
        data: null,
    },
    getConfigStaffs: {
        status: "idle",
        error: null,
        data: null,
    }
}

const mastersConfigSlice = createSlice({
    name: "mastersConfig",
    initialState: initialMastersConfigState,
    reducers: {
        getConfigClientsRequest: (state, action) => {
            state.getConfigClients.status = 'pending'
        },
        getConfigClientsSuccess: (state, action) => {
            state.getConfigClients.status = 'success'
            state.getConfigClients.data = action.payload;
        },
        getConfigClientsFailure: (state, action) => {
            state.getConfigClients.status = 'failed'
            state.getConfigClients.error = action.payload;
        },
        getConfigContactsRequest: (state, action) => {
            state.getConfigContacts.status = "pending";
        },
        getConfigContactsSuccess: (state, action) => {
            state.getConfigContacts.status = 'success'
            state.getConfigContacts.data = action.payload;
        },
        getConfigContactsFailure: (state, action) => {
            state.getConfigContacts.status = 'failed';
        },
        getConfigOpportunitiesRequest: (state, action) => {
            state.getConfigOpportunities.status = 'pending'
        },
        getConfigOpportunitiesSuccess: (state, action) => {
            state.getConfigOpportunities.status = 'success'
            state.getConfigOpportunities.data = action.payload;
        },
        getConfigOpportunitiesFailure: (state, action) => {
            state.getConfigOpportunities.status = 'failed'
            state.getConfigOpportunities.data = null
            state.getConfigOpportunities.error = action.payload;
        },
        getConfigTendersRequest: (state, action) => {
            state.getConfigTenders.status = 'pending'
        },
        getConfigTendersSuccess: (state, action) => {
            state.getConfigTenders.status = 'success'
            state.getConfigTenders.data = action.payload
        },
        getConfigTendersFailure: (state, action) => {
            state.getConfigTenders.status = 'failed'
            state.getConfigTenders.error = action.payload
        },
        getConfigStaffsRequest: (state) => {
            state.getConfigStaffs.status = 'pending'
        },
        getConfigStaffsSuccess: (state, action) => {
            state.getConfigStaffs.status = 'success'
            state.getConfigStaffs.data = action.payload
        },
        getConfigStaffsFailure: (state, action) => {
            state.getConfigStaffs.status = 'failed'
            state.getConfigStaffs.error = action.payload
        },
        clearGetConfigClientsStatus: (state) => {
            state.getConfigClients.status = "idle";
        },
        clearGetConfigClientsData: () => {
            state.getConfigClients.data = null;
        },
        clearGetConfigClientsError: (state) => {
            state.getConfigClients.error = null;
        },
        clearGetConfigContactsStatus: (state) => {
            state.getConfigContacts.status = "idle";
        },
        clearGetConfigContactsData: () => {
            state.getConfigContacts.data = null;
        },
        clearGetConfigContactsError: (state) => {
            state.getConfigContacts.error = null;
        },
        clearGetConfigOpportunitiesStatus: (state) => {
            state.getConfigOpportunities.status = "idle";
        },
        clearGetConfigOpportunitiesData: () => {
            state.getConfigOpportunities.data = null;
        },
        clearGetConfigOpportunitiesError: (state) => {
            state.getConfigOpportunities.error = null;
        },
        clearGetConfigTendersStatus: (state) => {
            state.getConfigTenders.status = "idle";
        },
        clearGetConfigTendersData: () => {
            state.getConfigTenders.data = null;
        },
        clearGetConfigTendersError: (state) => {
            state.getConfigTenders.error = null;
        },
        clearGetConfigStaffsStatus: (state) => {
            state.getConfigStaffs.status = "idle";
        },
        clearGetConfigStaffsData: () => {
            state.getConfigStaffs.data = null;
        },
        clearGetConfigStaffsError: (state) => {
            state.getConfigStaffs.error = null;
        },
    }
})

export const mastersConfigActions = mastersConfigSlice.actions;
export const mastersConfigReducer = mastersConfigSlice.reducer;