import { createSlice } from '@reduxjs/toolkit';

const initialSystemConfigState = {
    getSystemConfig: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllSystemConfigs: {
        status: "idle",
        error: null,
        data: null,
    },
    createSystemConfig: {
        status: "idle",
        error: null,
        data: null,
    },
    updateSystemConfig: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteSystemConfig: {
        status: "idle",
        error: null,
        data: null,
    }
}

const systemConfigSlice = createSlice({
    name: "systemConfig",
    initialState: initialSystemConfigState,
    reducers: {
        getSystemConfigRequest: (state, action) => {
            state.getSystemConfig.status = 'pending'
        },
        getSystemConfigSuccess: (state, action) => {
            state.getSystemConfig.status = 'success'
            state.getSystemConfig.data = action.payload;
        },
        getSystemConfigFailure: (state, action) => {
            state.getSystemConfig.status = 'failed'
            state.getSystemConfig.error = action.payload;
        },
        getAllSystemConfigsRequest: (state, action) => {
            state.getAllSystemConfigs.status = "pending";
        },
        getAllSystemConfigsSuccess: (state, action) => {
            state.getAllSystemConfigs.status = 'success'
            state.getAllSystemConfigs.data = action.payload;
        },
        getAllSystemConfigsFailure: (state, action) => {
            state.getAllSystemConfigs.status = 'failed';
        },
        createSystemConfigRequest: (state, action) => {
            state.createSystemConfig.status = 'pending'
        },
        createSystemConfigSuccess: (state, action) => {
            state.createSystemConfig.status = 'success'
            state.createSystemConfig.data = action.payload;
        },
        createSystemConfigFailure: (state, action) => {
            state.createSystemConfig.status = 'failed'
            state.createSystemConfig.data = null
            state.createSystemConfig.error = action.payload;
        },
        updateSystemConfigRequest: (state, action) => {
            state.updateSystemConfig.status = 'pending'
        },
        updateSystemConfigSuccess: (state, action) => {
            state.updateSystemConfig.status = 'success'
            state.updateSystemConfig.data = action.payload
        },
        updateSystemConfigFailure: (state, action) => {
            state.updateSystemConfig.status = 'failed'
            state.updateSystemConfig.error = action.payload
        },
        deleteSystemConfigRequest: (state) => {
            state.deleteSystemConfig.status = 'pending'
        },
        deleteSystemConfigSuccess: (state, action) => {
            state.deleteSystemConfig.status = 'success'
            state.deleteSystemConfig.data = action.payload
        },
        deleteSystemConfigFailure: (state, action) => {
            state.deleteSystemConfig.status = 'failed'
            state.deleteSystemConfig.error = action.payload
        },
        clearGetSystemConfigStatus: (state) => {
            state.getSystemConfig.status = "idle";
        },
        clearGetSystemConfigData: () => {
            state.getSystemConfig.data = null;
        },
        clearGetSystemConfigError: (state) => {
            state.getSystemConfig.error = null;
        },
        clearGetAllSystemConfigsStatus: (state) => {
            state.getAllSystemConfigs.status = "idle";
        },
        clearGetAllSystemConfigsData: () => {
            state.getAllSystemConfigs.data = null;
        },
        clearGetAllSystemConfigsError: (state) => {
            state.getAllSystemConfigs.error = null;
        },
        clearCreateSystemConfigStatus: (state) => {
            state.createSystemConfig.status = "idle";
        },
        clearCreateSystemConfigData: () => {
            state.createSystemConfig.data = null;
        },
        clearCreateSystemConfigError: (state) => {
            state.createSystemConfig.error = null;
        },
        clearUpdateSystemConfigStatus: (state) => {
            state.updateSystemConfig.status = "idle";
        },
        clearUpdateSystemConfigData: () => {
            state.updateSystemConfig.data = null;
        },
        clearUpdateSystemConfigError: (state) => {
            state.updateSystemConfig.error = null;
        },
        clearDeleteSystemConfigStatus: (state) => {
            state.deleteSystemConfig.status = "idle";
        },
        clearDeleteSystemConfigData: () => {
            state.deleteSystemConfig.data = null;
        },
        clearDeleteSystemConfigError: (state) => {
            state.deleteSystemConfig.error = null;
        },
    }
})

export const systemConfigActions = systemConfigSlice.actions;
export const systemConfigReducer = systemConfigSlice.reducer;