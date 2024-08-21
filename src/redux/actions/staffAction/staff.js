import axios from "axios";
import { staffActions } from "@/redux/slices/staffSlice"
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";
const route = `${serverURL}/team/staff`

export const getAllStaffs = ({ page = null, limit = null, config = false }) => async (dispatch) => {
    try {
        if (config) {
            dispatch(mastersConfigActions.getConfigStaffsRequest());
        } else {
            dispatch(staffActions.getAllStaffsRequest());
        }
        console.log('getAllStaffs config', config);
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config }
        });

        console.log('get-all-staff-res-data', response?.data);
        if (config) {
            dispatch(mastersConfigActions.getConfigStaffsSuccess(response.data?.data))
        } else {
            dispatch(staffActions.getAllStaffsSuccess(response.data.data));
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
            dispatch(mastersConfigActions.getConfigStaffsFailure());
        } else {
            dispatch(staffActions.getAllStaffsFailure(errorMessage));
        }
    }
};

export const getStaff = (staffId) => async (dispatch) => {
    try {
        console.log("get-staff-data-by id", staffId);
        dispatch(staffActions.getStaffRequest());

        const response = await axios.get(`${route}/${staffId}`, {
            // headers: {
            //     "authorization": token
            // }
        });
        console.log('get-staff-details-res-data', response.data);
        dispatch(staffActions.getStaffSuccess(response.data));
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
        dispatch(staffActions.getStaffFailure(errorMessage));
    }
};

export const createStaff = (staffData) => async (dispatch) => {
    try {
        console.log("create-staff-data", staffData);
        dispatch(staffActions.createStaffRequest());

        const response = await axios.post(
            `${route}/`,
            staffData,
            {
                headers: {
                    // "Content-Type": "multipart/form-data",
                    // "authorization": token
                },
            }
        );
        console.log('create-staff-res-data', response);
        dispatch(staffActions.createStaffSuccess(response.data.data));
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
        dispatch(staffActions.createStaffFailure(errorMessage));
    }
};

export const updateStaff = (staffData, staffId) => async (dispatch) => {

    try {
        console.log("update-staffData-req", staffData,);
        dispatch(staffActions.updateStaffRequest());
        const response = await axios.put(
            `${route}/${staffId}`,
            staffData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log('update-staff-res-data', response.data);
        dispatch(staffActions.getStaffSuccess(response.data));
        dispatch(staffActions.updateStaffSuccess(response.data));
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
        dispatch(staffActions.updateStaffFailure(errorMessage));
    }
};

export const deleteStaff = (staffId, token) => async (dispatch) => {
    try {
        console.log("delete-staffData", staffId);
        dispatch(staffActions.deleteStaffRequest());

        const data = await axios.delete(
            `${route}/${staffId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-staff-res-data', data.data);
        dispatch(staffActions.deleteStaffSuccess(data.data));
    } catch (error) {
        console.log("delete-staff-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(staffActions.deleteStaffFailure(errorMessage));
    }
};