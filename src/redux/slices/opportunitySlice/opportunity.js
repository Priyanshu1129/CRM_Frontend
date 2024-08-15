import { createSlice } from '@reduxjs/toolkit';

const initialOpportunityState = {
    getOpportunity: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllOpportunities: {
        status: "idle",
        error: null,
        data: null,
    },
    createOpportunity: {
        status: "idle",
        error: null,
        data: null,
    },
    updateOpportunity: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteOpportunity: {
        status: "idle",
        error: null,
        data: null,
    }
}

const opportunitySlice = createSlice({
    name: "opportunity",
    initialState: initialOpportunityState,
    reducers: {
        getOpportunityRequest: (state, action) => {
            state.getOpportunity.status = 'pending'
        },
        getOpportunitySuccess: (state, action) => {
            state.getOpportunity.status = 'success'
            state.getOpportunity.data = action.payload;
        },
        getOpportunityFailure: (state, action) => {
            state.getOpportunity.status = 'failed'
            state.getOpportunity.error = action.payload;
        },
        getAllOpportunitiesRequest: (state, action) => {
            state.getAllOpportunities.status = "pending";
        },
        getAllOpportunitiesSuccess: (state, action) => {
            state.getAllOpportunities.status = 'success'
            state.getAllOpportunities.data = action.payload;
        },
        getAllOpportunitiesFailure: (state, action) => {
            state.getAllOpportunities.status = 'failed';
        },
        createOpportunityRequest: (state, action) => {
            state.createOpportunity.status = 'pending'
        },
        createOpportunitySuccess: (state, action) => {
            state.createOpportunity.status = 'success'
            state.createOpportunity.data = action.payload;
        },
        createOpportunityFailure: (state, action) => {
            state.createOpportunity.status = 'failed'
            state.createOpportunity.data = null
            state.createOpportunity.error = action.payload;
        },
        updateOpportunityRequest: (state, action) => {
            state.updateOpportunity.status = 'pending'
        },
        updateOpportunitySuccess: (state, action) => {
            state.updateOpportunity.status = 'success'
            state.updateOpportunity.data = action.payload
        },
        updateOpportunityFailure: (state, action) => {
            state.updateOpportunity.status = 'failed'
            state.updateOpportunity.error = action.payload
        },
        deleteOpportunityRequest: (state) => {
            state.deleteOpportunity.status = 'pending'
        },
        deleteOpportunitySuccess: (state, action) => {
            state.deleteOpportunity.status = 'success'
            state.deleteOpportunity.data = action.payload
        },
        deleteOpportunityFailure: (state, action) => {
            state.deleteOpportunity.status = 'failed'
            state.deleteOpportunity.error = action.payload
        },
        clearGetOpportunityStatus: (state) => {
            state.getOpportunity.status = "idle";
        },
        clearGetOpportunityData: () => {
            state.getOpportunity.data = null;
        },
        clearGetOpportunityError: (state) => {
            state.getOpportunity.error = null;
        },
        clearGetAllOpportunitiesStatus: (state) => {
            state.getAllOpportunities.status = "idle";
        },
        clearGetAllOpportunitiesData: () => {
            state.getAllOpportunities.data = null;
        },
        clearGetAllOpportunitiesError: (state) => {
            state.getAllOpportunities.error = null;
        },
        clearCreateOpportunityStatus: (state) => {
            state.createOpportunity.status = "idle";
        },
        clearCreateOpportunityData: () => {
            state.createOpportunity.data = null;
        },
        clearCreateOpportunityError: (state) => {
            state.createOpportunity.error = null;
        },
        clearUpdateOpportunityStatus: (state) => {
            state.updateOpportunity.status = "idle";
        },
        clearUpdateOpportunityData: () => {
            state.updateOpportunity.data = null;
        },
        clearUpdateOpportunityError: (state) => {
            state.updateOpportunity.error = null;
        },
        clearDeleteOpportunityStatus: (state) => {
            state.deleteOpportunity.status = "idle";
        },
        clearDeleteOpportunityData: () => {
            state.deleteOpportunity.data = null;
        },
        clearDeleteOpportunityError: (state) => {
            state.deleteOpportunity.error = null;
        },
    }
})

export const opportunityActions = opportunitySlice.actions;
export const opportunityReducer = opportunitySlice.reducer;