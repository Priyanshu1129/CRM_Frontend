import { createSlice } from '@reduxjs/toolkit';

const initialSolutionState = {
    getSolution: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllSolutions: {
        status: "idle",
        error: null,
        data: null,
    },
    createSolution: {
        status: "idle",
        error: null,
        data: null,
    },
    updateSolution: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteSolution: {
        status: "idle",
        error: null,
        data: null,
    }
}

const solutionSlice = createSlice({
    name: "solution",
    initialState: initialSolutionState,
    reducers: {
        getSolutionRequest: (state, action) => {
            state.getSolution.status = 'pending'
        },
        getSolutionSuccess: (state, action) => {
            state.getSolution.status = 'success'
            state.getSolution.data = action.payload;
        },
        getSolutionFailure: (state, action) => {
            state.getSolution.status = 'failed'
            state.getSolution.error = action.payload;
        },
        getAllSolutionsRequest: (state, action) => {
            state.getAllSolutions.status = "pending";
        },
        getAllSolutionsSuccess: (state, action) => {
            state.getAllSolutions.status = 'success'
            state.getAllSolutions.data = null
        },
        getAllSolutionsFailure: (state, action) => {
            state.getAllSolutions.status = 'failed';
        },
        createSolutionRequest: (state, action) => {
            state.createSolution.status = 'pending'
        },
        createSolutionSuccess: (state, action) => {
            state.createSolution.status = 'success'
            state.createSolution.data = action.payload;
        },
        createSolutionFailure: (state, action) => {
            state.createSolution.status = 'failed'
            state.createSolution.data = null
            state.createSolution.error = action.payload;
        },
        updateSolutionRequest: (state, action) => {
            state.updateSolution.status = 'pending'
        },
        updateSolutionSuccess: (state, action) => {
            state.updateSolution.status = 'success'
            state.updateSolution.data = action.payload
        },
        updateSolutionFailure: (state, action) => {
            state.updateSolution.status = 'failed'
            state.updateSolution.error = action.payload
        },
        deleteSolutionRequest: (state) => {
            state.deleteSolution.status = 'pending'
        },
        deleteSolutionSuccess: (state, action) => {
            state.deleteSolution.status = 'success'
            state.deleteSolution.data = action.payload
        },
        deleteSolutionFailure: (state, action) => {
            state.deleteSolution.status = 'failed'
            state.deleteSolution.error = action.payload
        },
        clearGetSolutionStatus: (state) => {
            state.getSolution.status = "idle";
        },
        clearGetSolutionData: () => {
            state.getSolution.data = null;
        },
        clearGetSolutionError: (state) => {
            state.getSolution.error = null;
        },
        clearGetAllSolutionsStatus: (state) => {
            state.getAllSolutions.status = "idle";
        },
        clearGetAllSolutionsData: () => {
            state.getAllSolutions.data = null;
        },
        clearGetAllSolutionsError: (state) => {
            state.getAllSolutions.error = null;
        },
        clearCreateSolutionStatus: (state) => {
            state.createSolution.status = "idle";
        },
        clearCreateSolutionData: () => {
            state.createSolution.data = null;
        },
        clearCreateSolutionError: (state) => {
            state.createSolution.error = null;
        },
        clearUpdateSolutionStatus: (state) => {
            state.updateSolution.status = "idle";
        },
        clearUpdateSolutionData: () => {
            state.updateSolution.data = null;
        },
        clearUpdateSolutionError: (state) => {
            state.updateSolution.error = null;
        },
        clearDeleteSolutionStatus: (state) => {
            state.deleteSolution.status = "idle";
        },
        clearDeleteSolutionData: () => {
            state.deleteSolution.data = null;
        },
        clearDeleteSolutionError: (state) => {
            state.deleteSolution.error = null;
        },
    }
})

export const solutionActions = solutionSlice.actions;
export const solutionReducer = solutionSlice.reducer;