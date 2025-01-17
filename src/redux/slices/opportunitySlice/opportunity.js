import { createSlice } from "@reduxjs/toolkit";

const initialOpportunityState = {
  getOpportunity: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllOpportunities: {
    status: "idle",
    error: null,
    data: null,
  },
  createOpportunity: {
    status: "idle",
    error: null,
    data: null,
  },
  updateOpportunity: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteOpportunity: {
    status: "idle",
    confirm: false,
    error: null,
    data: null,
  },
  deleteOpportunityPopup: {
    open: false,
    opportunityId: null,
  },
};

const opportunitySlice = createSlice({
  name: "opportunity",
  initialState: initialOpportunityState,
  reducers: {
    // delete popup
    setDeleteOpportunityPopup: (state, action) => {
      (state.deleteOpportunityPopup.open = true),
        (state.deleteOpportunityPopup.opportunityId =
          action.payload.toString());
    },
    clearDeleteOpportunityPopup: (state, action) => {
      (state.deleteOpportunityPopup.open = false),
        (state.deleteOpportunityPopup.opportunityId = null);
    },

    getOpportunityRequest: (state, action) => {
      state.getOpportunity.status = "pending";
    },
    getOpportunitySuccess: (state, action) => {
      state.getOpportunity.status = "success";
      state.getOpportunity.data = action.payload;
    },
    getOpportunityFailure: (state, action) => {
      state.getOpportunity.status = "failed";
      state.getOpportunity.error = action.payload;
    },
    getAllOpportunitiesRequest: (state, action) => {
      state.getAllOpportunities.status = "pending";
    },
    getAllOpportunitiesSuccess: (state, action) => {
      state.getAllOpportunities.status = "success";
      state.getAllOpportunities.data = action.payload;
    },
    getAllOpportunitiesFailure: (state, action) => {
      state.getAllOpportunities.status = "failed";
      state.getAllOpportunities.error = action.payload;
    },
    createOpportunityRequest: (state, action) => {
      state.createOpportunity.status = "pending";
    },
    createOpportunitySuccess: (state, action) => {
      state.createOpportunity.status = "success";
      state.createOpportunity.data = action.payload;
    },
    createOpportunityFailure: (state, action) => {
      state.createOpportunity.status = "failed";
      state.createOpportunity.data = null;
      state.createOpportunity.error = action.payload;
    },
    updateOpportunityRequest: (state, action) => {
      state.updateOpportunity.status = "pending";
    },
    updateOpportunitySuccess: (state, action) => {
      state.updateOpportunity.status = "success";
      state.updateOpportunity.data = action.payload;
    },
    updateOpportunityFailure: (state, action) => {
      state.updateOpportunity.status = "failed";
      state.updateOpportunity.error = action.payload;
    },
    deleteOpportunityRequest: (state) => {
      state.deleteOpportunity.status = "pending";
    },
    deleteOpportunitySuccess: (state, action) => {
      state.deleteOpportunity.status = "success";
      state.deleteOpportunity.data = action.payload.data;
      state.deleteOpportunity.confirm = action.payload.confirm;
    },
    deleteOpportunityFailure: (state, action) => {
      state.deleteOpportunity.status = "failed";
      state.deleteOpportunity.error = action.payload;
    },
    clearGetOpportunityStatus: (state) => {
      state.getOpportunity.status = "idle";
    },
    clearGetOpportunityData: () => {
      state.getOpportunity.data = null;
    },
    clearGetOpportunityError: (state) => {
      state.getOpportunity.error = null;
    },
    clearGetAllOpportunitiesStatus: (state) => {
      state.getAllOpportunities.status = "idle";
    },
    clearGetAllOpportunitiesData: () => {
      state.getAllOpportunities.data = null;
    },
    clearGetAllOpportunitiesError: (state) => {
      state.getAllOpportunities.error = null;
    },
    clearCreateOpportunityStatus: (state) => {
      state.createOpportunity.status = "idle";
    },
    clearCreateOpportunityData: () => {
      state.createOpportunity.data = null;
    },
    clearCreateOpportunityError: (state) => {
      state.createOpportunity.error = null;
    },
    clearUpdateOpportunityStatus: (state) => {
      state.updateOpportunity.status = "idle";
    },
    clearUpdateOpportunityData: () => {
      state.updateOpportunity.data = null;
    },
    clearUpdateOpportunityError: (state) => {
      state.updateOpportunity.error = null;
    },
    clearDeleteOpportunityStatus: (state) => {
      state.deleteOpportunity.status = "idle";
    },
    clearDeleteOpportunityData: () => {
      state.deleteOpportunity.data = null;
    },
    clearDeleteOpportunityError: (state) => {
      state.deleteOpportunity.error = null;
    },
    updateOpportunityList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure `state.getAllOpportunities.data.opportunities` exists and is an array
      if (!Array.isArray(state.getAllOpportunities?.data?.opportunities)) {
        state.getAllOpportunities.data = {
          ...state.getAllOpportunities.data,
          opportunities: [],
          totalCount: 0,
        };
      }

      switch (type) {
        case "add": {
          state.getAllOpportunities.data.opportunities = [
            payload,
            ...state.getAllOpportunities.data.opportunities,
          ];
          state.getAllOpportunities.data.totalCount++;
          break;
        }

        case "update": {
          const index = state.getAllOpportunities.data.opportunities.findIndex(
            (opportunity) =>
              opportunity._id.toString() === payload._id.toString()
          );
          if (index !== -1) {
            state.getAllOpportunities.data.opportunities[index] = payload;
          }
          break;
        }

        case "delete": {
          state.getAllOpportunities.data.opportunities =
            state.getAllOpportunities.data.opportunities.filter(
              (opportunity) =>
                opportunity._id.toString() !== payload._id.toString()
            );
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const opportunityActions = opportunitySlice.actions;
export const opportunityReducer = opportunitySlice.reducer;
