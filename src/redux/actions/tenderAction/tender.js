import axios from "axios";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";

const route = `${serverURL}/tender`

export const getAllTenders = ({ page = null, limit = null, config = false }) => async (dispatch) => {
    try {
        if (config) {
            dispatch(mastersConfigActions.getConfigTendersRequest());
        } else {
            dispatch(tenderActions.getAllTendersRequest());
        }
        console.log('getAllTenders-config', config);
        const response = await axios.get(`${route}/`, {
            params: {
                limit,
                page,
                config
            }
        });
        console.log('get-all-tender-res-data', response.data);

        if (config) {
            dispatch(mastersConfigActions.getConfigTendersSuccess(response.data?.data));
        } else {
            dispatch(tenderActions.getAllTendersSuccess(response.data?.data));
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
            dispatch(mastersConfigActions.getConfigTendersFailure());
        } else {
            dispatch(tenderActions.getAllTendersFailure(errorMessage));
        }
    }
};

export const getTender = (tenderId, token) => async (dispatch) => {
    try {
        console.log("get-tender-data", tenderId, token);
        dispatch(tenderActions.getTenderRequest());

        const data = await axios.get(`${route}/details/${tenderId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-tender-details-res-data', data.data);
        dispatch(tenderActions.getTenderSuccess(data.data));
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
        dispatch(tenderActions.getTenderFailure(errorMessage));
    }
};

export const createTender = (tenderData) => async (dispatch) => {
    try {
        console.log("create-tenderData", tenderData);
        dispatch(tenderActions.createTenderRequest());

        const data = await axios.post(
            `${route}/`,
            tenderData,
            {
                headers: {
                    // "authorization": token
                },
            }
        );
        console.log('create-tender-res-data', data);
        dispatch(tenderActions.createTenderSuccess(data.data));
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
        dispatch(tenderActions.createTenderFailure(errorMessage));
    }
};

export const updateTender = (tenderData, token, tenderId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(tenderData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (tenderData?.avatarUri) {
        const fileName = tenderData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: tenderData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-tenderData%", tenderData,);
        console.log("update-tenderData%", formData,);
        dispatch(tenderActions.updateTenderRequest());
        console.log("update url----------", `${route}/${tenderId}`);
        const data = await axios.put(
            `${route}/${tenderId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-tender-res-data', data.data);
        dispatch(tenderActions.updateTenderSuccess(data.data));
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
        dispatch(tenderActions.updateTenderFailure(errorMessage));
    }
};

export const deleteTender = (tenderId, token) => async (dispatch) => {
    try {
        console.log("delete-tenderData", tenderId);
        dispatch(tenderActions.deleteTenderRequest());

        const data = await axios.delete(
            `${route}/${tenderId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-tender-res-data', data.data);
        dispatch(tenderActions.deleteTenderSuccess(data.data));
    } catch (error) {
        console.log("delete-tender-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(tenderActions.deleteTenderFailure(errorMessage));
    }
};