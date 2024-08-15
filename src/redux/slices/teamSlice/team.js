import { createSlice } from '@reduxjs/toolkit';

const initialTeamState = {
    getTeam: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllTeams: {
        status: "idle",
        error: null,
        data: null,
    },
    createTeam: {
        status: "idle",
        error: null,
        data: null,
    },
    updateTeam: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteTeam: {
        status: "idle",
        error: null,
        data: null,
    }
}

const teamSlice = createSlice({
    name: "team",
    initialState: initialTeamState,
    reducers: {
        getTeamRequest: (state, action) => {
            state.getTeam.status = 'pending'
        },
        getTeamSuccess: (state, action) => {
            state.getTeam.status = 'success'
            state.getTeam.data = action.payload;
        },
        getTeamFailure: (state, action) => {
            state.getTeam.status = 'failed'
            state.getTeam.error = action.payload;
        },
        getAllTeamsRequest: (state, action) => {
            state.getAllTeams.status = "pending";
        },
        getAllTeamsSuccess: (state, action) => {
            state.getAllTeams.status = 'success'
            state.getAllTeams.data = action.payload;
        },
        getAllTeamsFailure: (state, action) => {
            state.getAllTeams.status = 'failed';
        },
        createTeamRequest: (state, action) => {
            state.createTeam.status = 'pending'
        },
        createTeamSuccess: (state, action) => {
            state.createTeam.status = 'success'
            state.createTeam.data = action.payload;
        },
        createTeamFailure: (state, action) => {
            state.createTeam.status = 'failed'
            state.createTeam.data = null
            state.createTeam.error = action.payload;
        },
        updateTeamRequest: (state, action) => {
            state.updateTeam.status = 'pending'
        },
        updateTeamSuccess: (state, action) => {
            state.updateTeam.status = 'success'
            state.updateTeam.data = action.payload
        },
        updateTeamFailure: (state, action) => {
            state.updateTeam.status = 'failed'
            state.updateTeam.error = action.payload
        },
        deleteTeamRequest: (state) => {
            state.deleteTeam.status = 'pending'
        },
        deleteTeamSuccess: (state, action) => {
            state.deleteTeam.status = 'success'
            state.deleteTeam.data = action.payload
        },
        deleteTeamFailure: (state, action) => {
            state.deleteTeam.status = 'failed'
            state.deleteTeam.error = action.payload
        },
        clearGetTeamStatus: (state) => {
            state.getTeam.status = "idle";
        },
        clearGetTeamData: () => {
            state.getTeam.data = null;
        },
        clearGetTeamError: (state) => {
            state.getTeam.error = null;
        },
        clearGetAllTeamsStatus: (state) => {
            state.getAllTeams.status = "idle";
        },
        clearGetAllTeamsData: () => {
            state.getAllTeams.data = null;
        },
        clearGetAllTeamsError: (state) => {
            state.getAllTeams.error = null;
        },
        clearCreateTeamStatus: (state) => {
            state.createTeam.status = "idle";
        },
        clearCreateTeamData: () => {
            state.createTeam.data = null;
        },
        clearCreateTeamError: (state) => {
            state.createTeam.error = null;
        },
        clearUpdateTeamStatus: (state) => {
            state.updateTeam.status = "idle";
        },
        clearUpdateTeamData: () => {
            state.updateTeam.data = null;
        },
        clearUpdateTeamError: (state) => {
            state.updateTeam.error = null;
        },
        clearDeleteTeamStatus: (state) => {
            state.deleteTeam.status = "idle";
        },
        clearDeleteTeamData: () => {
            state.deleteTeam.data = null;
        },
        clearDeleteTeamError: (state) => {
            state.deleteTeam.error = null;
        },
    }
})

export const teamActions = teamSlice.actions;
export const teamReducer = teamSlice.reducer;