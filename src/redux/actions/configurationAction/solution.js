import axios from "axios";
import { solutionActions } from "@/redux/slices/configurationSlice";
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/solution`

export const getAllSolutions = () => async (dispatch) => {
    try {
        dispatch(solutionActions.getAllSolutionsRequest());
        console.log('getAllSolutions');
        const response = await axios.get(`${route}/`, {
            withCredentials: true,
        });

        console.log('get-all-solution-res-data', response.data);
        dispatch(solutionActions.getAllSolutionsSuccess(response.data));
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
        dispatch(solutionActions.getAllSolutionsFailure(errorMessage));
    }
};

export const getSolution = (solutionId, token) => async (dispatch) => {
    try {
        console.log("get-solution-data", solutionId, token);
        dispatch(solutionActions.getSolutionRequest());

        const data = await axios.get(`${route}/details/${solutionId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-solution-details-res-data', data.data);
        dispatch(solutionActions.getSolutionSuccess(data.data));
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
        dispatch(solutionActions.getSolutionFailure(errorMessage));
    }
};

export const createSolution = (solutionData) => async (dispatch) => {
    try {
        console.log(" createSolution  solutionData : ", solutionData)
        const data = await axios.post(
            `${route}/`,
            solutionData,
            {
                withCredentials: true
            }
        );
        console.log('create-solution-res-data', data);
        dispatch(solutionActions.createSolutionSuccess(data.data));
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
        dispatch(solutionActions.createSolutionFailure(errorMessage));
    }
};

export const updateSolution = (solutionData, solutionId) => async (dispatch) => {

    

    try {
        console.log("update-solutionData%", solutionData,);
       
        dispatch(solutionActions.updateSolutionRequest());
        console.log("update url----------", `${route}/${solutionId}`);
        const data = await axios.put(
            `${route}/${solutionId}`,
            solutionData,
            {
                withCredentials : true
            }
        );
        console.log('update-solution-res-data', data.data);
        dispatch(solutionActions.updateSolutionSuccess(data.data));
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
        dispatch(solutionActions.updateSolutionFailure(errorMessage));
    }
};

export const deleteSolution = (solutionId, token) => async (dispatch) => {
    try {
        console.log("delete-solutionData", solutionId);
        dispatch(solutionActions.deleteSolutionRequest());

        const data = await axios.delete(
            `${route}/${solutionId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-solution-res-data', data.data);
        dispatch(solutionActions.deleteSolutionSuccess(data.data));
    } catch (error) {
        console.log("delete-solution-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(solutionActions.deleteSolutionFailure(errorMessage));
    }
};