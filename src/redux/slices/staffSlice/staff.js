import { createSlice } from '@reduxjs/toolkit';

const initialStaffState = {
    getStaff: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllStaffs: {
        status: "idle",
        error: null,
        data: null,
    },
    createStaff: {
        status: "idle",
        error: null,
        data: null,
    },
    updateStaff: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteStaff: {
        status: "idle",
        error: null,
        data: null,
    }
}

const staffSlice = createSlice({
    name: "staff",
    initialState: initialStaffState,
    reducers: {
        getStaffRequest: (state, action) => {
            state.getStaff.status = 'pending'
        },
        getStaffSuccess: (state, action) => {
            state.getStaff.status = 'success'
            state.getStaff.data = action.payload;
        },
        getStaffFailure: (state, action) => {
            state.getStaff.status = 'failed'
            state.getStaff.error = action.payload;
        },
        getAllStaffsRequest: (state, action) => {
            state.getAllStaffs.status = "pending";
        },
        getAllStaffsSuccess: (state, action) => {
            state.getAllStaffs.status = "success"
            state.getAllStaffs.data = action.payload;
        },
        getAllStaffsFailure: (state) => {
            state.getAllStaffs.status = "failed";
        },
        createStaffRequest: (state, action) => {
            state.createStaff.status = 'pending'
        },
        createStaffSuccess: (state, action) => {
            state.createStaff.status = 'success'
            state.createStaff.data = action.payload;
        },
        createStaffFailure: (state, action) => {
            state.createStaff.status = 'failed'
            state.createStaff.data = null
            state.createStaff.error = action.payload;
        },
        updateStaffRequest: (state, action) => {
            state.updateStaff.status = 'pending'
        },
        updateStaffSuccess: (state, action) => {
            state.updateStaff.status = 'success'
            state.updateStaff.data = action.payload
        },
        updateStaffFailure: (state, action) => {
            state.updateStaff.status = 'failed'
            state.updateStaff.error = action.payload
        },
        deleteStaffRequest: (state) => {
            state.deleteStaff.status = 'pending'
        },
        deleteStaffSuccess: (state, action) => {
            state.deleteStaff.status = 'success'
            state.deleteStaff.data = action.payload
        },
        deleteStaffFailure: (state, action) => {
            state.deleteStaff.status = 'failed'
            state.deleteStaff.error = action.payload
        },
        clearGetStaffStatus: (state) => {
            state.getStaff.status = "idle";
        },
        clearGetStaffData: () => {
            state.getStaff.data = null;
        },
        clearGetStaffError: (state) => {
            state.getStaff.error = null;
        },
        clearGetAllStaffsStatus: (state) => {
            state.getAllStaffs.status = "idle";
        },
        clearGetAllStaffsData: () => {
            state.getAllStaffs.data = null;
        },
        clearGetAllStaffsError: (state) => {
            state.getAllStaffs.error = null;
        },
        clearCreateStaffStatus: (state) => {
            state.createStaff.status = "idle";
        },
        clearCreateStaffData: () => {
            state.createStaff.data = null;
        },
        clearCreateStaffError: (state) => {
            state.createStaff.error = null;
        },
        clearUpdateStaffStatus: (state) => {
            state.updateStaff.status = "idle";
        },
        clearUpdateStaffData: () => {
            state.updateStaff.data = null;
        },
        clearUpdateStaffError: (state) => {
            state.updateStaff.error = null;
        },
        clearDeleteStaffStatus: (state) => {
            state.deleteStaff.status = "idle";
        },
        clearDeleteStaffData: () => {
            state.deleteStaff.data = null;
        },
        clearDeleteStaffError: (state) => {
            state.deleteStaff.error = null;
        },
    }
})

export const staffActions = staffSlice.actions;
export const staffReducer = staffSlice.reducer;