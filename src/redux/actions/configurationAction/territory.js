import axios from "axios";
import { territoryActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/territory`

export const getAllTerritories = () => async (dispatch) => {
    try {
        dispatch(territoryActions.getAllTerritoriesRequest());
        console.log('getAllTerritories');
        const response = await axios.get(`${route}/`);

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

export const createTerritory = (territoryData, token) => async (dispatch) => {
    try {
        console.log("create-territoryData", territoryData);
        dispatch(territoryActions.createTerritoryRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(territoryData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = territoryData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: territoryData.avatarUri,
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

export const updateTerritory = (territoryData, token, territoryId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(territoryData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (territoryData?.avatarUri) {
        const fileName = territoryData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: territoryData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-territoryData%", territoryData,);
        console.log("update-territoryData%", formData,);
        dispatch(territoryActions.updateTerritoryRequest());
        console.log("update url----------", `${route}/${territoryId}`);
        const data = await axios.put(
            `${route}/${territoryId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
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