import axios from "axios";
import { teamActions } from "@/redux/slices/teamSlice"
import { serverURL } from "@/config/config";

const route = `${serverURL}/configuration/team`

export const getAllTeams = (token) => async (dispatch) => {
    try {
        dispatch(teamActions.getAllTeamsRequest());
        console.log('getAllTeams', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-all-team-res-data', data.data);
        dispatch(teamActions.getAllTeamsSuccess(data.data));
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
        dispatch(teamActions.getAllTeamsFailure(errorMessage));
    }
};

export const getTeam = (teamId, token) => async (dispatch) => {
    try {
        console.log("get-team-data", teamId, token);
        dispatch(teamActions.getTeamRequest());

        const data = await axios.get(`${route}/details/${teamId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-team-details-res-data', data.data);
        dispatch(teamActions.getTeamSuccess(data.data));
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
        dispatch(teamActions.getTeamFailure(errorMessage));
    }
};

export const createTeam = (teamData, token) => async (dispatch) => {
    try {
        console.log("create-teamData", teamData);
        dispatch(teamActions.createTeamRequest());
        const formData = new FormData();

        // Append other form data to FormData
        Object.entries(teamData).forEach(([key, value]) => {
            if (key != 'avatarUri') {
                formData.append(key, value);
            }
        });

        const fileName = teamData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: teamData.avatarUri,
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
        console.log('create-team-res-data', data);
        dispatch(teamActions.createTeamSuccess(data.data));
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
        dispatch(teamActions.createTeamFailure(errorMessage));
    }
};

export const updateTeam = (teamData, token, teamId) => async (dispatch) => {

    const formData = new FormData();
    Object.entries(teamData).forEach(([key, value]) => {
        if (key != 'avatarUri') {
            formData.append(key, value);
        }
    });

    if (teamData?.avatarUri) {
        const fileName = teamData.avatarUri.split('/').pop();
        // Determine file type based on file extension
        const fileType = fileName.split('.').pop();

        // Append avatar file to FormData
        formData.append("avatar", {
            uri: teamData.avatarUri,
            type: `image/${fileType}`,
            name: fileName
        });
    }

    try {
        console.log("update-teamData%", teamData,);
        console.log("update-teamData%", formData,);
        dispatch(teamActions.updateTeamRequest());
        console.log("update url----------", `${route}/${teamId}`);
        const data = await axios.put(
            `${route}/${teamId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-team-res-data', data.data);
        dispatch(teamActions.updateTeamSuccess(data.data));
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
        dispatch(teamActions.updateTeamFailure(errorMessage));
    }
};

export const deleteTeam = (teamId, token) => async (dispatch) => {
    try {
        console.log("delete-teamData", teamId);
        dispatch(teamActions.deleteTeamRequest());

        const data = await axios.delete(
            `${route}/${teamId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-team-res-data', data.data);
        dispatch(teamActions.deleteTeamSuccess(data.data));
    } catch (error) {
        console.log("delete-team-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(teamActions.deleteTeamFailure(errorMessage));
    }
};