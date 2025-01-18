import { createSlice } from "@reduxjs/toolkit";

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
    data: null,
  },
  deleteRole: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllEntities: {
    status: "idle",
    error: null,
    data: null,
  },
};

const roleSlice = createSlice({
  name: "role",
  initialState: initialRoleState,
  reducers: {
    getRoleRequest: (state, action) => {
      state.getRole.status = "pending";
    },
    getRoleSuccess: (state, action) => {
      state.getRole.status = "success";
      state.getRole.data = action.payload;
    },
    getRoleFailure: (state, action) => {
      state.getRole.status = "failed";
      state.getRole.error = action.payload;
    },
    getAllRolesRequest: (state, action) => {
      state.getAllRoles.status = "pending";
    },
    getAllRolesSuccess: (state, action) => {
      state.getAllRoles.status = "success";
      state.getAllRoles.data = action.payload;
    },
    getAllRolesFailure: (state, action) => {
      state.getAllRoles.status = "failed";
      state.getAllRoles.error = action.payload;
    },
    getAllEntitiesRequest: (state, action) => {
      state.getAllEntities.status = "pending";
    },
    getAllEntitiesSuccess: (state, action) => {
      state.getAllEntities.status = "success";
      state.getAllEntities.data = action.payload;
    },
    getAllEntitiesFailure: (state, action) => {
      state.getAllEntities.status = "failed";
      state.getAllEntities.error = action.payload;
    },
    createRoleRequest: (state, action) => {
      state.createRole.status = "pending";
    },
    createRoleSuccess: (state, action) => {
      state.createRole.status = "success";
      state.createRole.data = action.payload;
    },
    createRoleFailure: (state, action) => {
      state.createRole.status = "failed";
      state.createRole.data = null;
      state.createRole.error = action.payload;
    },
    updateRoleRequest: (state, action) => {
      state.updateRole.status = "pending";
    },
    updateRoleSuccess: (state, action) => {
      state.updateRole.status = "success";
      state.updateRole.data = action.payload;
    },
    updateRoleFailure: (state, action) => {
      state.updateRole.status = "failed";
      state.updateRole.error = action.payload;
    },
    editRolePermissionsRequest: (state, action) => {
      state.editRolePermissions.status = "pending";
    },
    editRolePermissionsSuccess: (state, action) => {
      state.editRolePermissions.status = "success";
      state.editRolePermissions.data = action.payload;
    },
    editRolePermissionsFailure: (state, action) => {
      state.editRolePermissions.status = "failed";
      state.editRolePermissions.error = action.payload;
    },
    deleteRoleRequest: (state) => {
      state.deleteRole.status = "pending";
    },
    deleteRoleSuccess: (state, action) => {
      state.deleteRole.status = "success";
      state.deleteRole.data = action.payload;
    },
    deleteRoleFailure: (state, action) => {
      state.deleteRole.status = "failed";
      state.deleteRole.error = action.payload;
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
    clearGetAllEntitiesStatus: (state) => {
      state.getAllEntities.status = "idle";
    },
    clearGetAllEntitiesData: () => {
      state.getAllEntities.data = null;
    },
    clearGetAllEntitiesError: (state) => {
      state.getAllEntities.error = null;
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
    updateRoleList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure `state.getAllUsers.data.users` exists and is an array
      if (!Array.isArray(state.getAllRoles?.data?.roles)) {
        state.getAllRoles.data = {
          ...state.getAllRoles.data,
          roles: [],
          totalCount: 0,
        };
      }

      switch (type) {
        case "add": {
          state.getAllRoles.data.roles = [
            payload,
            ...state.getAllRoles.data.roles,
          ];
          state.getAllRoles.data.totalCount++;
          break;
        }

        case "update": {
          const index = state.getAllRoles.data.roles.findIndex((role) => {
            return role._id.toString() === payload?._id.toString();
          });
          if (index !== -1) {
            state.getAllRoles.data.roles[index] = payload;
          }
          break;
        }

        case "delete": {
          state.getAllRoles.data.roles = state.getAllRoles.data.roles.filter(
            (role) => role._id.toString() !== payload._id.toString()
          );
          state.getAllRoles.data.totalCount--;
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const roleActions = roleSlice.actions;
export const roleReducer = roleSlice.reducer;
