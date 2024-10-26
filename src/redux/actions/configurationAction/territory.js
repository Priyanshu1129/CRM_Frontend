import axios from "axios";
import { territoryActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/territory`

export const getAllTerritories = () => async (dispatch) => {
    try {
        dispatch(territoryActions.getAllTerritoriesRequest());
        console.log('getAllTerritories');
        const response = await axios.get(`${route}/`, {
            withCredentials: true,
        });

        console.log('get-all-territory-res-data', response.data);
        dispatch(territoryActions.getAllTerritoriesSuccess(response.data));
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
        dispatch(territoryActions.getAllTerritoriesFailure(errorMessage));
    }
};

export const getTerritory = (territoryId, token) => async (dispatch) => {
    try {
        console.log("get-territory-data", territoryId, token);
        dispatch(territoryActions.getTerritoryRequest());

        const data = await axios.get(`${route}/details/${territoryId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-territory-details-res-data', data.data);
        dispatch(territoryActions.getTerritorySuccess(data.data));
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
        dispatch(territoryActions.getTerritoryFailure(errorMessage));
    }
};

export const createTerritory = (territoryData) => async (dispatch) => {
    // territoryData : {label : "NAME"}
    try {
        console.log("create-territoryData", territoryData);
        dispatch(territoryActions.createTerritoryRequest());
        const formData = new FormData();

        console.log("territory in createTerritory action", territoryData)

        const data = await axios.post(
            `${route}/`,
            territoryData,
            {
               withCredentials : true
            }
        );
        console.log('create-territory-res-data', data);
        dispatch(territoryActions.createTerritorySuccess(data.data));
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
        dispatch(territoryActions.createTerritoryFailure(errorMessage));
    }
};

export const updateTerritory = (territoryData, territoryId) => async (dispatch) => {

     
    try {
        console.log("update-territoryData%", territoryData, territoryId);
       
        dispatch(territoryActions.updateTerritoryRequest());
        console.log("update url----------", `${route}/${territoryId}`);
        const data = await axios.put(
            `${route}/${territoryId}`,
            territoryData,
            {
                withCredentials : true
            }
        );
        console.log('update-territory-res-data', data.data);
        dispatch(territoryActions.updateTerritorySuccess(data.data));
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
        dispatch(territoryActions.updateTerritoryFailure(errorMessage));
    }
};

export const deleteTerritory = (territoryId, token) => async (dispatch) => {
    try {
        console.log("delete-territoryData", territoryId);
        dispatch(territoryActions.deleteTerritoryRequest());

        const data = await axios.delete(
            `${route}/${territoryId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-territory-res-data', data.data);
        dispatch(territoryActions.deleteTerritorySuccess(data.data));
    } catch (error) {
        console.log("delete-territory-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(territoryActions.deleteTerritoryFailure(errorMessage));
    }
};