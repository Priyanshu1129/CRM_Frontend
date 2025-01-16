import { axiosRequest } from "@/utilities/axiosHelper";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/role`;

export const getAllRoles = () => async (dispatch) => {
  try {
    console.log("get-All-Roles req");
    dispatch(roleActions.getAllRolesRequest());

    // Using axiosRequest helper for GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/`, // Endpoint for getting all roles
      null, // No request body
      null // No query parameters
    );

    console.log("get-all-role-res-data", response);
    dispatch(roleActions.getAllRolesSuccess(response.data));
  } catch (error) {
    dispatch(
      roleActions.getAllRolesFailure(error.message || "An error occurred")
    );
  }
};

export const getAllEntities = () => async (dispatch) => {
  try {
    console.log("get all entities request");
    dispatch(roleActions.getAllEntitiesRequest());

    // Using axiosRequest helper for GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/entities/get-all`, // Endpoint for getting all entities
      null, // No request body
      null // No query parameters
    );

    console.log("get-all-entities-res-data", response);
    dispatch(roleActions.getAllEntitiesSuccess(response?.data));
  } catch (error) {
    dispatch(
      roleActions.getAllEntitiesFailure(error.message || "An error occurred")
    );
  }
};

export const getRole = (roleId) => async (dispatch) => {
  try {
    console.log("get-role-data-by id", roleId);
    dispatch(roleActions.getRoleRequest());

    // Using axiosRequest helper for GET request
    const response = await axiosRequest(
      dispatch,
      "GET", // HTTP method for GET request
      `${route}/${roleId}`, // Endpoint for getting the role by ID
      null, // No request body
      null // No query parameters
    );

    console.log("get-role-details-res-data", response);
    dispatch(roleActions.getRoleSuccess(response));
  } catch (error) {
    dispatch(roleActions.getRoleFailure(error.message || "An error occurred"));
  }
};

export const createRole = (roleData) => async (dispatch) => {
  try {
    console.log("create-role-data", roleData);
    dispatch(roleActions.createRoleRequest());

    // Using axiosRequest helper for POST request
    const response = await axiosRequest(
      dispatch,
      "POST", // HTTP method for POST request
      `${route}/`, // Endpoint for creating a new role
      roleData, // Request body containing the role data
      null // No query parameters
    );

    console.log("create-role-res-data", response);
    dispatch(roleActions.createRoleSuccess(response.data));
  } catch (error) {
    dispatch(
      roleActions.createRoleFailure(error.message || "An error occurred")
    );
  }
};

export const updateRole = (roleData, roleId) => async (dispatch) => {
  try {
    console.log("update-roleData-req", roleData);
    dispatch(roleActions.updateRoleRequest());

    // Using axiosRequest helper for PUT request
    const response = await axiosRequest(
      dispatch,
      "PUT", // HTTP method for PUT request
      `${route}/${roleId}`, // Endpoint for updating the role by ID
      roleData, // Request body containing the updated role data
      null // No query parameters
    );

    console.log("update-role-res-data", response);
    dispatch(roleActions.getRoleSuccess(response));
    dispatch(roleActions.updateRoleSuccess(response));
  } catch (error) {
    dispatch(
      roleActions.updateRoleFailure(error.message || "An error occurred")
    );
  }
};

export const editRolePermissions =
  (permissionData, roleId) => async (dispatch) => {
    try {
      console.log("edit-permission-data-req", permissionData);
      dispatch(roleActions.editRolePermissionsRequest());

      // Using axiosRequest helper for PUT request to edit role permissions
      const response = await axiosRequest(
        dispatch,
        "PUT", // HTTP method for PUT request
        `${route}/edit-permissions/${roleId}`, // Endpoint to edit permissions for a role
        permissionData, // Request body containing the permission data
        null // No query parameters
      );

      console.log("edit-role-permission-res-data", response);
      dispatch(roleActions.getRoleSuccess(response)); // Dispatch to update role details if needed
      dispatch(roleActions.editRolePermissionsSuccess(response)); // Dispatch for success
    } catch (error) {
      dispatch(
        roleActions.editRolePermissionsFailure(
          error.message || "An error occurred"
        )
      ); // Dispatch failure
    }
  };

export const deleteRole = (roleId, confirm) => async (dispatch) => {
  try {
    console.log("delete-roleData", roleId);
    dispatch(roleActions.deleteRoleRequest());

    // Using axiosRequest helper for DELETE request to delete a role
    const response = await axiosRequest(
      dispatch,
      "DELETE", // HTTP method for DELETE request
      `${route}/${roleId}?confirm=${confirm}`, // Endpoint to delete the role
    );

    console.log("delete-role-res-data", response.data);
    dispatch(roleActions.deleteRoleSuccess(response.data)); // Dispatch success
  } catch (error) {
    dispatch(
      roleActions.deleteRoleFailure(error.message || "An error occurred")
    ); // Dispatch failure
    console.log("delete-role-error", error);
  }
};
