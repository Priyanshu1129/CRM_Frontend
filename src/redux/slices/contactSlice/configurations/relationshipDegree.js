import { createSlice } from "@reduxjs/toolkit";

const initialRelationshipDegreeState = {
  getRelationshipDegree: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllRelationshipDegrees: {
    status: "idle",
    error: null,
    data: null,
  },
  createRelationshipDegree: {
    status: "idle",
    error: null,
    data: null,
  },
  updateRelationshipDegree: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteRelationshipDegree: {
    status: "idle",
    error: null,
    data: null,
  },
};

const relationshipDegreeSlice = createSlice({
  name: "relationshipDegree",
  initialState: initialRelationshipDegreeState,
  reducers: {
    getRelationshipDegreeRequest: (state, action) => {
      state.getRelationshipDegree.status = "pending";
    },
    getRelationshipDegreeSuccess: (state, action) => {
      state.getRelationshipDegree.status = "success";
      state.getRelationshipDegree.data = action.payload;
    },
    getRelationshipDegreeFailure: (state, action) => {
      state.getRelationshipDegree.status = "failed";
      state.getRelationshipDegree.error = action.payload;
    },
    getAllRelationshipDegreesRequest: (state, action) => {
      state.getAllRelationshipDegrees.status = "pending";
    },
    getAllRelationshipDegreesSuccess: (state, action) => {
      state.getAllRelationshipDegrees.status = "success";
      state.getAllRelationshipDegrees.data = action.payload;
    },
    getAllRelationshipDegreesFailure: (state, action) => {
      state.getAllRelationshipDegrees.status = "failed";
      state.getAllRelationshipDegrees.error = action.payload;
    },
    createRelationshipDegreeRequest: (state, action) => {
      state.createRelationshipDegree.status = "pending";
    },
    createRelationshipDegreeSuccess: (state, action) => {
      state.createRelationshipDegree.status = "success";
      state.createRelationshipDegree.data = action.payload;
    },
    createRelationshipDegreeFailure: (state, action) => {
      state.createRelationshipDegree.status = "failed";
      state.createRelationshipDegree.data = null;
      state.createRelationshipDegree.error = action.payload;
    },
    updateRelationshipDegreeRequest: (state, action) => {
      state.updateRelationshipDegree.status = "pending";
    },
    updateRelationshipDegreeSuccess: (state, action) => {
      state.updateRelationshipDegree.status = "success";
      state.updateRelationshipDegree.data = action.payload;
    },
    updateRelationshipDegreeFailure: (state, action) => {
      state.updateRelationshipDegree.status = "failed";
      state.updateRelationshipDegree.error = action.payload;
    },
    deleteRelationshipDegreeRequest: (state) => {
      state.deleteRelationshipDegree.status = "pending";
    },
    deleteRelationshipDegreeSuccess: (state, action) => {
      state.deleteRelationshipDegree.status = "success";
      state.deleteRelationshipDegree.data = action.payload;
    },
    deleteRelationshipDegreeFailure: (state, action) => {
      state.deleteRelationshipDegree.status = "failed";
      state.deleteRelationshipDegree.error = action.payload;
    },
    clearGetRelationshipDegreeStatus: (state) => {
      state.getRelationshipDegree.status = "idle";
    },
    clearGetRelationshipDegreeData: () => {
      state.getRelationshipDegree.data = null;
    },
    clearGetRelationshipDegreeError: (state) => {
      state.getRelationshipDegree.error = null;
    },
    clearGetAllRelationshipDegreesStatus: (state) => {
      state.getAllRelationshipDegrees.status = "idle";
    },
    clearGetAllRelationshipDegreesData: () => {
      state.getAllRelationshipDegrees.data = null;
    },
    clearGetAllRelationshipDegreesError: (state) => {
      state.getAllRelationshipDegrees.error = null;
    },
    clearCreateRelationshipDegreeStatus: (state) => {
      state.createRelationshipDegree.status = "idle";
    },
    clearCreateRelationshipDegreeData: () => {
      state.createRelationshipDegree.data = null;
    },
    clearCreateRelationshipDegreeError: (state) => {
      state.createRelationshipDegree.error = null;
    },
    clearUpdateRelationshipDegreeStatus: (state) => {
      state.updateRelationshipDegree.status = "idle";
    },
    clearUpdateRelationshipDegreeData: () => {
      state.updateRelationshipDegree.data = null;
    },
    clearUpdateRelationshipDegreeError: (state) => {
      state.updateRelationshipDegree.error = null;
    },
    clearDeleteRelationshipDegreeStatus: (state) => {
      state.deleteRelationshipDegree.status = "idle";
    },
    clearDeleteRelationshipDegreeData: () => {
      state.deleteRelationshipDegree.data = null;
    },
    clearDeleteRelationshipDegreeError: (state) => {
      state.deleteRelationshipDegree.error = null;
    },
  },
});

export const relationshipDegreeActions = relationshipDegreeSlice.actions;
export const relationshipDegreeReducer = relationshipDegreeSlice.reducer;
