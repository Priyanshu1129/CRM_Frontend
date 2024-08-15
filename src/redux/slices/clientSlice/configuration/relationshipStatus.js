import { createSlice } from '@reduxjs/toolkit';

const initialRelationshipStatusState = {
    getRelationshipStatus: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllRelationshipStatus: {
        status: "idle",
        error: null,
        data: null,
    },
    createRelationshipStatus: {
        status: "idle",
        error: null,
        data: null,
    },
    updateRelationshipStatus: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteRelationshipStatus: {
        status: "idle",
        error: null,
        data: null,
    }
}

const relationshipStatusSlice = createSlice({
    name: "relationshipStatus",
    initialState: initialRelationshipStatusState,
    reducers: {
        getRelationshipStatusRequest: (state, action) => {
            state.getRelationshipStatus.status = 'pending'
        },
        getRelationshipStatusSuccess: (state, action) => {
            state.getRelationshipStatus.status = 'success'
            state.getRelationshipStatus.data = action.payload;
        },
        getRelationshipStatusFailure: (state, action) => {
            state.getRelationshipStatus.status = 'failed'
            state.getRelationshipStatus.error = action.payload;
        },
        getAllRelationshipStatusRequest: (state, action) => {
            state.getAllRelationshipStatus.status = "pending";
        },
        getAllRelationshipStatusSuccess: (state, action) => {
            state.getAllRelationshipStatus.status = 'success'
            state.getAllRelationshipStatus.data = null
        },
        getAllRelationshipStatusFailure: (state, action) => {
            state.getAllRelationshipStatus.status = 'failed';
        },
        createRelationshipStatusRequest: (state, action) => {
            state.createRelationshipStatus.status = 'pending'
        },
        createRelationshipStatusSuccess: (state, action) => {
            state.createRelationshipStatus.status = 'success'
            state.createRelationshipStatus.data = action.payload;
        },
        createRelationshipStatusFailure: (state, action) => {
            state.createRelationshipStatus.status = 'failed'
            state.createRelationshipStatus.data = null
            state.createRelationshipStatus.error = action.payload;
        },
        updateRelationshipStatusRequest: (state, action) => {
            state.updateRelationshipStatus.status = 'pending'
        },
        updateRelationshipStatusSuccess: (state, action) => {
            state.updateRelationshipStatus.status = 'success'
            state.updateRelationshipStatus.data = action.payload
        },
        updateRelationshipStatusFailure: (state, action) => {
            state.updateRelationshipStatus.status = 'failed'
            state.updateRelationshipStatus.error = action.payload
        },
        deleteRelationshipStatusRequest: (state) => {
            state.deleteRelationshipStatus.status = 'pending'
        },
        deleteRelationshipStatusSuccess: (state, action) => {
            state.deleteRelationshipStatus.status = 'success'
            state.deleteRelationshipStatus.data = action.payload
        },
        deleteRelationshipStatusFailure: (state, action) => {
            state.deleteRelationshipStatus.status = 'failed'
            state.deleteRelationshipStatus.error = action.payload
        },
        clearGetRelationshipStatusStatus: (state) => {
            state.getRelationshipStatus.status = "idle";
        },
        clearGetRelationshipStatusData: () => {
            state.getRelationshipStatus.data = null;
        },
        clearGetRelationshipStatusError: (state) => {
            state.getRelationshipStatus.error = null;
        },
        clearGetAllRelationshipStatusStatus: (state) => {
            state.getAllRelationshipStatus.status = "idle";
        },
        clearGetAllRelationshipStatusData: () => {
            state.getAllRelationshipStatus.data = null;
        },
        clearGetAllRelationshipStatusError: (state) => {
            state.getAllRelationshipStatus.error = null;
        },
        clearCreateRelationshipStatusStatus: (state) => {
            state.createRelationshipStatus.status = "idle";
        },
        clearCreateRelationshipStatusData: () => {
            state.createRelationshipStatus.data = null;
        },
        clearCreateRelationshipStatusError: (state) => {
            state.createRelationshipStatus.error = null;
        },
        clearUpdateRelationshipStatusStatus: (state) => {
            state.updateRelationshipStatus.status = "idle";
        },
        clearUpdateRelationshipStatusData: () => {
            state.updateRelationshipStatus.data = null;
        },
        clearUpdateRelationshipStatusError: (state) => {
            state.updateRelationshipStatus.error = null;
        },
        clearDeleteRelationshipStatusStatus: (state) => {
            state.deleteRelationshipStatus.status = "idle";
        },
        clearDeleteRelationshipStatusData: () => {
            state.deleteRelationshipStatus.data = null;
        },
        clearDeleteRelationshipStatusError: (state) => {
            state.deleteRelationshipStatus.error = null;
        },
    }
})

export const relationshipStatusActions = relationshipStatusSlice.actions;
export const relationshipStatusReducer = relationshipStatusSlice.reducer;