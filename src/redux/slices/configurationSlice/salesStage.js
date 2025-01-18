import { createSlice } from "@reduxjs/toolkit";

const initialSalesStageState = {
  getSalesStage: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllSalesStages: {
    status: "idle",
    error: null,
    data: null,
  },

  updateSalesStage: {
    status: "idle",
    error: null,
    data: null,
  },
};

const salesStageSlice = createSlice({
  name: "salesStage",
  initialState: initialSalesStageState,
  reducers: {
    getSalesStageRequest: (state, action) => {
      state.getSalesStage.status = "pending";
    },
    getSalesStageSuccess: (state, action) => {
      state.getSalesStage.status = "success";
      state.getSalesStage.data = action.payload;
    },
    getSalesStageFailure: (state, action) => {
      state.getSalesStage.status = "failed";
      state.getSalesStage.error = action.payload;
    },
    getAllSalesStagesRequest: (state, action) => {
      state.getAllSalesStages.status = "pending";
    },
    getAllSalesStagesSuccess: (state, action) => {
      state.getAllSalesStages.status = "success";
      state.getAllSalesStages.data = action.payload;
    },
    getAllSalesStagesFailure: (state, action) => {
      state.getAllSalesStages.status = "failed";
      state.getAllSalesStages.error = action.payload;
    },

    updateSalesStageRequest: (state, action) => {
      state.updateSalesStage.status = "pending";
    },
    updateSalesStageSuccess: (state, action) => {
      state.updateSalesStage.status = "success";
      state.updateSalesStage.data = action.payload;
    },
    updateSalesStageFailure: (state, action) => {
      state.updateSalesStage.status = "failed";
      state.updateSalesStage.error = action.payload;
    },

    clearGetSalesStageStatus: (state) => {
      state.getSalesStage.status = "idle";
    },
    clearGetSalesStageData: () => {
      state.getSalesStage.data = null;
    },
    clearGetSalesStageError: (state) => {
      state.getSalesStage.error = null;
    },
    clearGetAllSalesStagesStatus: (state) => {
      state.getAllSalesStages.status = "idle";
    },
    clearGetAllSalesStagesData: () => {
      state.getAllSalesStages.data = null;
    },
    clearGetAllSalesStagesError: (state) => {
      state.getAllSalesStages.error = null;
    },

    clearUpdateSalesStageStatus: (state) => {
      state.updateSalesStage.status = "idle";
    },
    clearUpdateSalesStageData: () => {
      state.updateSalesStage.data = null;
    },
    clearUpdateSalesStageError: (state) => {
      state.updateSalesStage.error = null;
    },

    updateSalesStageList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure `state.getAllUsers.data.users` exists and is an array
      if (!Array.isArray(state.getAllSalesStages?.data?.data)) {
        state.getAllSalesStages.data = {
          ...state.getAllSalesStages.data,
          data: [],
        };
      }

      switch (type) {
        case "update": {
          const index = state.getAllSalesStages.data.data.findIndex(
            (salesStage) => {
              return salesStage._id.toString() === payload?._id.toString();
            }
          );
          if (index !== -1) {
            state.getAllSalesStages.data.data[index] = payload;
          }
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const salesStageActions = salesStageSlice.actions;
export const salesStageReducer = salesStageSlice.reducer;
