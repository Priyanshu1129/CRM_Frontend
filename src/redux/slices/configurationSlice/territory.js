import { createSlice } from "@reduxjs/toolkit";

const initialTerritoryState = {
  getTerritory: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllTerritories: {
    status: "idle",
    error: null,
    data: null,
  },
  createTerritory: {
    status: "idle",
    error: null,
    data: null,
  },
  updateTerritory: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteTerritory: {
    status: "idle",
    error: null,
    data: null,
  },
};

export const territorySlice = createSlice({
  name: "territory",
  initialState: initialTerritoryState,
  reducers: {
    getTerritoryRequest: (state, action) => {
      state.getTerritory.status = "pending";
    },
    getTerritorySuccess: (state, action) => {
      state.getTerritory.status = "success";
      state.getTerritory.data = action.payload;
    },
    getTerritoryFailure: (state, action) => {
      state.getTerritory.status = "failed";
      state.getTerritory.error = action.payload;
    },
    getAllTerritoriesRequest: (state, action) => {
      state.getAllTerritories.status = "pending";
    },
    getAllTerritoriesSuccess: (state, action) => {
      state.getAllTerritories.status = "success";
      state.getAllTerritories.data = action.payload;
    },
    getAllTerritoriesFailure: (state, action) => {
      state.getAllTerritories.status = "failed";
      state.getAllTerritories.error = action.payload;
    },
    createTerritoryRequest: (state, action) => {
      state.createTerritory.status = "pending";
    },
    createTerritorySuccess: (state, action) => {
      state.createTerritory.status = "success";
      state.createTerritory.data = action.payload;
    },
    createTerritoryFailure: (state, action) => {
      state.createTerritory.status = "failed";
      state.createTerritory.data = null;
      state.createTerritory.error = action.payload;
    },
    updateTerritoryRequest: (state, action) => {
      state.updateTerritory.status = "pending";
    },
    updateTerritorySuccess: (state, action) => {
      state.updateTerritory.status = "success";
      state.updateTerritory.data = action.payload;
    },
    updateTerritoryFailure: (state, action) => {
      state.updateTerritory.status = "failed";
      state.updateTerritory.error = action.payload;
    },
    deleteTerritoryRequest: (state) => {
      state.deleteTerritory.status = "pending";
    },
    deleteTerritorySuccess: (state, action) => {
      state.deleteTerritory.status = "success";
      state.deleteTerritory.data = action.payload;
    },
    deleteTerritoryFailure: (state, action) => {
      state.deleteTerritory.status = "failed";
      state.deleteTerritory.error = action.payload;
    },
    clearGetTerritoryStatus: (state) => {
      state.getTerritory.status = "idle";
    },
    clearGetTerritoryData: () => {
      state.getTerritory.data = null;
    },
    clearGetTerritoryError: (state) => {
      state.getTerritory.error = null;
    },
    clearGetAllTerritoriesStatus: (state) => {
      state.getAllTerritories.status = "idle";
    },
    clearGetAllTerritoriesData: () => {
      state.getAllTerritories.data = null;
    },
    clearGetAllTerritoriesError: (state) => {
      state.getAllTerritories.error = null;
    },
    clearCreateTerritoriesStatus: (state) => {
      state.createTerritory.status = "idle";
    },
    clearCreateTerritoryData: () => {
      state.createTerritory.data = null;
    },
    clearCreateTerritoryError: (state) => {
      state.createTerritory.error = null;
    },
    clearUpdateTerritoryStatus: (state) => {
      state.updateTerritory.status = "idle";
    },
    clearUpdateTerritoryData: () => {
      state.updateTerritory.data = null;
    },
    clearUpdateTerritoryError: (state) => {
      state.updateTerritory.error = null;
    },
    clearDeleteTerritoryStatus: (state) => {
      state.deleteTerritory.status = "idle";
    },
    clearDeleteTerritoryData: () => {
      state.deleteTerritory.data = null;
    },
    clearDeleteTerritoryError: (state) => {
      state.deleteTerritory.error = null;
    },
    updateTerritoryList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure `state.getAllUsers.data.users` exists and is an array
      if (!Array.isArray(state.getAllTerritories?.data?.data)) {
        state.getAllTerritories.data = {
          ...state.getAllTerritories.data,
          data: [],
        };
      }

      switch (type) {
        case "add": {
          state.getAllTerritories.data.data = [
            payload,
            ...state.getAllTerritories.data.data,
          ];
          break;
        }

        case "update": {
          const index = state.getAllTerritories.data.data.findIndex(
            (territory) => {
              return territory._id.toString() === payload?._id.toString();
            }
          );
          if (index !== -1) {
            state.getAllTerritories.data.data[index] = payload;
          }
          break;
        }

        case "delete": {
          state.getAllTerritories.data.data =
            state.getAllTerritories.data.data.filter(
              (territory) => territory._id.toString() !== payload._id.toString()
            );
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const territoryActions = territorySlice.actions;
export const territoryReducer = territorySlice.reducer;
