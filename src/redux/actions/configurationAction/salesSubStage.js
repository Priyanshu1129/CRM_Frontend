import axios from "axios";
import { salesSubStageActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/sales-sub-stage`

export const getAllSalesSubStages = () => async (dispatch) => {
    try {
        dispatch(salesSubStageActions.getAllSalesSubStagesRequest());
        console.log('getAllSalesSubStages');
        const response = await axios.get(`${route}/`, {
            withCredentials: true,
        });

        console.log('get-all-salesSubStage-res-data', response.data);
        dispatch(salesSubStageActions.getAllSalesSubStagesSuccess(response.data));
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
        dispatch(salesSubStageActions.getAllSalesSubStagesFailure(errorMessage));
    }
};

export const getSalesSubStage = (salesSubStageId, token) => async (dispatch) => {
    try {
        console.log("get-salesSubStage-data", salesSubStageId, token);
        dispatch(salesSubStageActions.getSalesSubStageRequest());

        const data = await axios.get(`${route}/details/${salesSubStageId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-salesSubStage-details-res-data', data.data);
        dispatch(salesSubStageActions.getSalesSubStageSuccess(data.data));
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
        dispatch(salesSubStageActions.getSalesSubStageFailure(errorMessage));
    }
};

export const createSalesSubStage = (salesSubStageData) => async (dispatch) => {
    try {
        console.log("create-req-salesSubStageData", salesSubStageData);
        
        const data = await axios.post(
            `${route}/`,
            salesSubStageData,
            {
                withCredentials : true
            }
        );
        console.log('create-salesSubStage-res-data', data);
        dispatch(salesSubStageActions.createSalesSubStageSuccess(data.data));
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
        dispatch(salesSubStageActions.createSalesSubStageFailure(errorMessage));
    }
};

export const updateSalesSubStage = (salesSubStageData,salesSubStageId) => async (dispatch) => {

    try {
        console.log("update-salesSubStageData%", salesSubStageData);
        dispatch(salesSubStageActions.updateSalesSubStageRequest());
        console.log("update url----------", `${route}/${salesSubStageId}`);
        const data = await axios.put(
            `${route}/${salesSubStageId}`,
            salesSubStageData,
            {
                withCredentials : true
            }
        );
        console.log('update-salesSubStage-res-data', data.data);
        dispatch(salesSubStageActions.updateSalesSubStageSuccess(data.data));
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
        dispatch(salesSubStageActions.updateSalesSubStageFailure(errorMessage));
    }
};

export const deleteSalesSubStage = (salesSubStageId, token) => async (dispatch) => {
    try {
        console.log("delete-salesSubStageData", salesSubStageId);
        dispatch(salesSubStageActions.deleteSalesSubStageRequest());

        const data = await axios.delete(
            `${route}/${salesSubStageId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-salesSubStage-res-data', data.data);
        dispatch(salesSubStageActions.deleteSalesSubStageSuccess(data.data));
    } catch (error) {
        console.log("delete-salesSubStage-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(salesSubStageActions.deleteSalesSubStageFailure(errorMessage));
    }
};