import axios from "axios";
import { staffActions } from "@/redux/slices/staffSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/staff`

export const getAllStaffs = () => async (dispatch) => {
    try {
        dispatch(staffActions.getAllStaffsRequest());
        console.log('getAllStaffs');
        const data = await axios.get(`${route}/`);

        console.log('get-all-staff-res-data', data.data);
        dispatch(staffActions.getAllStaffsSuccess(data.data));
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
        dispatch(staffActions.getAllStaffsFailure(errorMessage));
    }
};

export const getStaff = (staffId, token) => async (dispatch) => {
    try {
        console.log("get-staff-data", staffId, token);
        dispatch(staffActions.getStaffRequest());

        const data = await axios.get(`${route}/details/${staffId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-staff-details-res-data', data.data);
        dispatch(staffActions.getStaffSuccess(data.data));
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

export const createStaff = (staffData, token) => async (dispatch) => {
    try {
        console.log("create-staffData", staffData);
        dispatch(staffActions.createStaffRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(staffData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = staffData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: staffData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });

        console.log("formdata-----before")
        console.log("formdata-----", formData)

        const data = await axios.post(
            `${route}/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('create-staff-res-data', data);
        dispatch(staffActions.createStaffSuccess(data.data));
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

export const updateStaff = (staffData, token, staffId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(staffData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (staffData?.avatarUri) {
        const fileName = staffData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: staffData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-staffData%", staffData,);
        console.log("update-staffData%", formData,);
        dispatch(staffActions.updateStaffRequest());
        console.log("update url----------", `${route}/${staffId}`);
        const data = await axios.put(
            `${route}/${staffId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-staff-res-data', data.data);
        dispatch(staffActions.updateStaffSuccess(data.data));
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