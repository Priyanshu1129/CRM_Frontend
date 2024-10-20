import axios from "axios";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice"
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/role`

export const getAllRoles = ({ config = false }) => async (dispatch) => {
    try {
        if (config) {
            // dispatch(mastersConfigActions.getConfigRolesRequest());
        } else {
            dispatch(roleActions.getAllRolesRequest());
        }
        console.log('getAllRoles config', config);
        const response = await axios.get(`${route}/`, {
            params: { config },
            withCredentials: true,
        });

        console.log('get-all-role-res-data', response?.data);
        if (config) {
            // dispatch(mastersConfigActions.getConfigRolesSuccess(response.data?.data))
        } else {
            dispatch(roleActions.getAllRolesSuccess(response.data.data));
        }
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        if (config) {
            dispatch(mastersConfigActions.getConfigRolesFailure());
        } else {
            dispatch(roleActions.getAllRolesFailure(errorMessage));
        }
    }
};

export const getAllPermissionEntities = () => async (dispatch) => {
    try {
        dispatch(roleActions.getAllPermissionEntitiesRequest());
        console.log('get all permission entities request');
        const response = await axios.get(`${route}/permissions/get-all`, {
            withCredentials: true,
        });

        console.log('get-all-permission-entities-res-data', response?.data);

        dispatch(roleActions.getAllPermissionEntitiesSuccess(response.data.data));

    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }

        dispatch(roleActions.getAllPermissionEntitiesFailure(errorMessage));

    }
};

export const getRole = (roleId) => async (dispatch) => {
    try {
        console.log("get-role-data-by id", roleId);
        dispatch(roleActions.getRoleRequest());

        const response = await axios.get(`${route}/${roleId}`, {
            withCredentials: true,
        });
        console.log('get-role-details-res-data', response.data);
        dispatch(roleActions.getRoleSuccess(response.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(roleActions.getRoleFailure(errorMessage));
    }
};

export const createRole = (roleData) => async (dispatch) => {
    try {
        console.log("create-role-data", roleData);
        dispatch(roleActions.createRoleRequest());

        const response = await axios.post(
            `${route}/`,
            roleData,
            {
                withCredentials: true,
            }
        );
        console.log('create-role-res-data', response);
        dispatch(roleActions.createRoleSuccess(response.data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(roleActions.createRoleFailure(errorMessage));
    }
};

export const updateRole = (roleData, roleId) => async (dispatch) => {

    try {
        console.log("update-roleData-req", roleData,);
        dispatch(roleActions.updateRoleRequest());
        const response = await axios.put(
            `${route}/${roleId}`,
            roleData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        console.log('update-role-res-data', response.data);
        dispatch(roleActions.getRoleSuccess(response.data));
        dispatch(roleActions.updateRoleSuccess(response.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(roleActions.updateRoleFailure(errorMessage));
    }
};

export const editRolePermissions = (permissionData, roleId) => async (dispatch) => {

    try {
        console.log("edit-permission-data-req", permissionData);
        dispatch(roleActions.editRolePermissionsRequest());
        const response = await axios.put(
            `${route}/edit-permissions/${roleId}`,
            permissionData,
            {
                withCredentials: true,
            }
        );
        console.log('edit-role-permission-res-data', response.data);
        dispatch(roleActions.getRoleSuccess(response.data));
        dispatch(roleActions.editRolePermissionsSuccess(response.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(roleActions.editRolePermissionsFailure(errorMessage));
    }
};

export const deleteRole = (roleId, token) => async (dispatch) => {
    try {
        console.log("delete-roleData", roleId);
        dispatch(roleActions.deleteRoleRequest());

        const data = await axios.delete(
            `${route}/${roleId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        console.log('delete-role-res-data', data.data);
        dispatch(roleActions.deleteRoleSuccess(data.data));
    } catch (error) {
        console.log("delete-role-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(roleActions.deleteRoleFailure(errorMessage));
    }
};