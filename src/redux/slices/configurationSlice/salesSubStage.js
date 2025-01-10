import { createSlice } from "@reduxjs/toolkit";

const initialSalesSubStageState = {
  getSalesSubStage: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllSalesSubStages: {
    status: "idle",
    error: null,
    data: null,
  },
  getFilteredSalesSubStages: {
    status: "idle",
    error: null,
    data: null,
  },
  createSalesSubStage: {
    status: "idle",
    error: null,
    data: null,
  },
  updateSalesSubStage: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteSalesSubStage: {
    status: "idle",
    error: null,
    data: null,
  },
};

const salesSubStageSlice = createSlice({
  name: "salesSubStage",
  initialState: initialSalesSubStageState,
  reducers: {
   // reducer to filter the salesSubStages acc to selected sales stage
    filterSalesSubStages : (state , action) => {
      const salesStageId = action.payload;
      console.log("filtered executed-----", salesStageId)
      const allSubStages = JSON.parse(JSON.stringify(state?.getAllSalesSubStages?.data?.data));
      state.getFilteredSalesSubStages.data = allSubStages.filter((subStage)=> subStage?.salesStage?._id?.toString() == salesStageId);
    }, 

    getSalesSubStageRequest: (state, action) => {
      state.getSalesSubStage.status = "pending";
    },
    getSalesSubStageSuccess: (state, action) => {
      state.getSalesSubStage.status = "success";
      state.getSalesSubStage.data = action.payload;
    },
    getSalesSubStageFailure: (state, action) => {
      state.getSalesSubStage.status = "failed";
      state.getSalesSubStage.error = action.payload;
    },
    getAllSalesSubStagesRequest: (state, action) => {
      state.getAllSalesSubStages.status = "pending";
    },
    getAllSalesSubStagesSuccess: (state, action) => {
      state.getAllSalesSubStages.status = "success";
      state.getAllSalesSubStages.data = action.payload;
    },
    getAllSalesSubStagesFailure: (state, action) => {
      state.getAllSalesSubStages.status = "failed";
      state.getAllSalesSubStages.error = action.payload;
    },
    createSalesSubStageRequest: (state, action) => {
      state.createSalesSubStage.status = "pending";
    },
    createSalesSubStageSuccess: (state, action) => {
      state.createSalesSubStage.status = "success";
      state.createSalesSubStage.data = action.payload;
    },
    createSalesSubStageFailure: (state, action) => {
      state.createSalesSubStage.status = "failed";
      state.createSalesSubStage.data = null;
      state.createSalesSubStage.error = action.payload;
    },
    updateSalesSubStageRequest: (state, action) => {
      state.updateSalesSubStage.status = "pending";
    },
    updateSalesSubStageSuccess: (state, action) => {
      state.updateSalesSubStage.status = "success";
      state.updateSalesSubStage.data = action.payload;
    },
    updateSalesSubStageFailure: (state, action) => {
      state.updateSalesSubStage.status = "failed";
      state.updateSalesSubStage.error = action.payload;
    },
    deleteSalesSubStageRequest: (state) => {
      state.deleteSalesSubStage.status = "pending";
    },
    deleteSalesSubStageSuccess: (state, action) => {
      state.deleteSalesSubStage.status = "success";
      state.deleteSalesSubStage.data = action.payload;
    },
    deleteSalesSubStageFailure: (state, action) => {
      state.deleteSalesSubStage.status = "failed";
      state.deleteSalesSubStage.error = action.payload;
    },
    clearGetSalesSubStageStatus: (state) => {
      state.getSalesSubStage.status = "idle";
    },
    clearGetSalesSubStageData: () => {
      state.getSalesSubStage.data = null;
    },
    clearGetSalesSubStageError: (state) => {
      state.getSalesSubStage.error = null;
    },
    clearGetAllSalesSubStagesStatus: (state) => {
      state.getAllSalesSubStages.status = "idle";
    },
    clearGetAllSalesSubStagesData: () => {
      state.getAllSalesSubStages.data = null;
    },
    clearGetAllSalesSubStagesError: (state) => {
      state.getAllSalesSubStages.error = null;
    },
    clearCreateSalesSubStageStatus: (state) => {
      state.createSalesSubStage.status = "idle";
    },
    clearCreateSalesSubStageData: () => {
      state.createSalesSubStage.data = null;
    },
    clearCreateSalesSubStageError: (state) => {
      state.createSalesSubStage.error = null;
    },
    clearUpdateSalesSubStageStatus: (state) => {
      state.updateSalesSubStage.status = "idle";
    },
    clearUpdateSalesSubStageData: () => {
      state.updateSalesSubStage.data = null;
    },
    clearUpdateSalesSubStageError: (state) => {
      state.updateSalesSubStage.error = null;
    },
    clearDeleteSalesSubStageStatus: (state) => {
      state.deleteSalesSubStage.status = "idle";
    },
    clearDeleteSalesSubStageData: () => {
      state.deleteSalesSubStage.data = null;
    },
    clearDeleteSalesSubStageError: (state) => {
      state.deleteSalesSubStage.error = null;
    },
  },
});

export const salesSubStageActions = salesSubStageSlice.actions;
export const salesSubStageReducer = salesSubStageSlice.reducer;
