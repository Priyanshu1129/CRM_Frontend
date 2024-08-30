import axios from "axios";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { serverURL } from "@/config/config";
import { mastersConfigActions } from "@/redux/slices/configurationSlice";

const route = `${serverURL}/tender`

export const getAllTenders = ({ page = null, limit = null, config = false, entryDate = "", enteredBy = "" }) => async (dispatch) => {
    try {
        if (config) {
            dispatch(mastersConfigActions.getConfigTendersRequest());
        } else {
            dispatch(tenderActions.getAllTendersRequest());
        }
        console.log('getAllTenders-config', config);
        const response = await axios.get(`${route}/`, {
            params: { limit, page, config, enteredBy, entry_date: entryDate },
            withCredentials: true,
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

export const getTender = (tenderId) => async (dispatch) => {
    try {
        console.log("get-tender-data", tenderId);
        dispatch(tenderActions.getTenderRequest());

        const response = await axios.get(`${route}/${tenderId}`, {
            withCredentials: true,
        });
        console.log('get-tender-details-res-data', response.data);
        dispatch(tenderActions.getTenderSuccess(response.data));
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
                withCredentials: true
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

export const updateTender = (tenderData, tenderId) => async (dispatch) => {


    try {
        console.log("update-tenderData-req", tenderData,);
        dispatch(tenderActions.updateTenderRequest());
        const response = await axios.put(
            `${route}/${tenderId}`,
            tenderData,
            {
                withCredentials: true,
            }
        );
        console.log('update-tender-res-data', response.data);
        dispatch(tenderActions.getTenderSuccess(response.data));
        dispatch(tenderActions.updateTenderSuccess(response.data));
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
                },
                withCredentials: true,
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