import axios from "axios";
import { userActions } from "@/redux/slices/userSlice"
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/team/user`

export const getAllUsers = ({ page = null, limit = null, config = false }) => async (dispatch) => {
    try {
        if (config) {
            dispatch(mastersConfigActions.getConfigUsersRequest());
        } else {
            dispatch(userActions.getAllUsersRequest());
        }
        console.log('getAllUsers config', config);
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config }
        });

        console.log('get-all-user-res-data', response?.data);
        if (config) {
            dispatch(mastersConfigActions.getConfigUsersSuccess(response.data?.data))
        } else {
            dispatch(userActions.getAllUsersSuccess(response.data.data));
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
            dispatch(mastersConfigActions.getConfigUsersFailure());
        } else {
            dispatch(userActions.getAllUsersFailure(errorMessage));
        }
    }
};

export const getUser = (userId) => async (dispatch) => {
    try {
        console.log("get-user-data-by id", userId);
        dispatch(userActions.getUserRequest());

        const response = await axios.get(`${route}/${userId}`, {
            // headers: {
            //     "authorization": token
            // }
        });
        console.log('get-user-details-res-data', response.data);
        dispatch(userActions.getUserSuccess(response.data));
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
        dispatch(userActions.getUserFailure(errorMessage));
    }
};

export const createUser = (userData) => async (dispatch) => {
    try {
        console.log("create-user-data", userData);
        dispatch(userActions.createUserRequest());

        const response = await axios.post(
            `${route}/`,
            userData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // "authorization": token
                },
            }
        );
        console.log('create-user-res-data', response);
        dispatch(userActions.createUserSuccess(response.data.data));
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
        dispatch(userActions.createUserFailure(errorMessage));
    }
};

export const updateUser = (userData, userId) => async (dispatch) => {

    try {
        console.log("update-userData-req", userData,);
        dispatch(userActions.updateUserRequest());
        const response = await axios.put(
            `${route}/${userId}`,
            userData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log('update-user-res-data', response.data);
        dispatch(userActions.getUserSuccess(response.data));
        dispatch(userActions.updateUserSuccess(response.data));
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
        dispatch(userActions.updateUserFailure(errorMessage));
    }
};

export const deleteUser = (userId, token) => async (dispatch) => {
    try {
        console.log("delete-userData", userId);
        dispatch(userActions.deleteUserRequest());

        const data = await axios.delete(
            `${route}/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-user-res-data', data.data);
        dispatch(userActions.deleteUserSuccess(data.data));
    } catch (error) {
        console.log("delete-user-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(userActions.deleteUserFailure(errorMessage));
    }
};