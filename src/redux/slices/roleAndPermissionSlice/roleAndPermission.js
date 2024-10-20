import { createSlice } from '@reduxjs/toolkit';

const initialRoleState = {
    getRole: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllRoles: {
        status: "idle",
        error: null,
        data: null,
    },
    createRole: {
        status: "idle",
        error: null,
        data: null,
    },
    updateRole: {
        status: "idle",
        error: null,
        data: null,
    },
    editRolePermissions: {
        status: "idle",
        error: null,
        data: null
    },
    deleteRole: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllPermissionEntities: {
        status: "idle",
        error: null,
        data: null,
    },
}

const roleSlice = createSlice({
    name: "role",
    initialState: initialRoleState,
    reducers: {
        getRoleRequest: (state, action) => {
            state.getRole.status = 'pending'
        },
        getRoleSuccess: (state, action) => {
            state.getRole.status = 'success'
            state.getRole.data = action.payload;
        },
        getRoleFailure: (state, action) => {
            state.getRole.status = 'failed'
            state.getRole.error = action.payload;
        },
        getAllRolesRequest: (state, action) => {
            state.getAllRoles.status = "pending";
        },
        getAllRolesSuccess: (state, action) => {
            state.getAllRoles.status = "success"
            state.getAllRoles.data = action.payload;
        },
        getAllRolesFailure: (state) => {
            state.getAllRoles.status = "failed";
        },
        getAllPermissionEntitiesRequest: (state, action) => {
            state.getAllPermissionEntities.status = "pending";
        },
        getAllPermissionEntitiesSuccess: (state, action) => {
            state.getAllPermissionEntities.status = "success"
            state.getAllPermissionEntities.data = action.payload;
        },
        getAllPermissionEntitiesFailure: (state) => {
            state.getAllPermissionEntities.status = "failed";
        },
        createRoleRequest: (state, action) => {
            state.createRole.status = 'pending'
        },
        createRoleSuccess: (state, action) => {
            state.createRole.status = 'success'
            state.createRole.data = action.payload;
        },
        createRoleFailure: (state, action) => {
            state.createRole.status = 'failed'
            state.createRole.data = null
            state.createRole.error = action.payload;
        },
        updateRoleRequest: (state, action) => {
            state.updateRole.status = 'pending'
        },
        updateRoleSuccess: (state, action) => {
            state.updateRole.status = 'success'
            state.updateRole.data = action.payload
        },
        updateRoleFailure: (state, action) => {
            state.updateRole.status = 'failed'
            state.updateRole.error = action.payload
        },
        editRolePermissionsRequest: (state, action) => {
            state.editRolePermissions.status = 'pending'
        },
        editRolePermissionsSuccess: (state, action) => {
            state.editRolePermissions.status = 'success'
            state.editRolePermissions.data = action.payload
        },
        editRolePermissionsFailure: (state, action) => {
            state.editRolePermissions.status = 'failed'
            state.editRolePermissions.error = action.payload
        },
        deleteRoleRequest: (state) => {
            state.deleteRole.status = 'pending'
        },
        deleteRoleSuccess: (state, action) => {
            state.deleteRole.status = 'success'
            state.deleteRole.data = action.payload
        },
        deleteRoleFailure: (state, action) => {
            state.deleteRole.status = 'failed'
            state.deleteRole.error = action.payload
        },
        clearGetRoleStatus: (state) => {
            state.getRole.status = "idle";
        },
        clearGetRoleData: () => {
            state.getRole.data = null;
        },
        clearGetRoleError: (state) => {
            state.getRole.error = null;
        },
        clearGetAllRolesStatus: (state) => {
            state.getAllRoles.status = "idle";
        },
        clearGetAllRolesData: () => {
            state.getAllRoles.data = null;
        },
        clearGetAllRolesError: (state) => {
            state.getAllRoles.error = null;
        },
        clearGetAllPermissionEntitiesStatus: (state) => {
            state.getAllPermissionEntities.status = "idle";
        },
        clearGetAllPermissionEntitiesData: () => {
            state.getAllPermissionEntities.data = null;
        },
        clearGetAllPermissionEntitiesError: (state) => {
            state.getAllPermissionEntities.error = null;
        },
        clearCreateRoleStatus: (state) => {
            state.createRole.status = "idle";
        },
        clearCreateRoleData: () => {
            state.createRole.data = null;
        },
        clearCreateRoleError: (state) => {
            state.createRole.error = null;
        },
        clearEditRolePermissionStatus: (state) => {
            state.editRolePermissions.status = "idle";
        },
        clearEditRolePermissionData: () => {
            state.editRolePermissions.data = null;
        },
        clearEditRolePermissionError: (state) => {
            state.editRolePermissions.error = null;
        },
        clearUpdateRoleStatus: (state) => {
            state.updateRole.status = "idle";
        },
        clearUpdateRoleData: () => {
            state.updateRole.data = null;
        },
        clearUpdateRoleError: (state) => {
            state.updateRole.error = null;
        },
        clearDeleteRoleStatus: (state) => {
            state.deleteRole.status = "idle";
        },
        clearDeleteRoleData: () => {
            state.deleteRole.data = null;
        },
        clearDeleteRoleError: (state) => {
            state.deleteRole.error = null;
        },
    }
})

export const roleActions = roleSlice.actions;
export const roleReducer = roleSlice.reducer;