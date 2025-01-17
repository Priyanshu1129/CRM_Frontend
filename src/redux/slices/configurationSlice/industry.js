import { createSlice } from "@reduxjs/toolkit";

const initialIndustryState = {
  getIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllIndustries: {
    status: "idle",
    error: null,
    data: null,
  },
  createIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
  updateIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
};

const industrySlice = createSlice({
  name: "industry",
  initialState: initialIndustryState,
  reducers: {
    getIndustryRequest: (state, action) => {
      state.getIndustry.status = "pending";
    },
    getIndustrySuccess: (state, action) => {
      state.getIndustry.status = "success";
      state.getIndustry.data = action.payload;
    },
    getIndustryFailure: (state, action) => {
      state.getIndustry.status = "failed";
      state.getIndustry.error = action.payload;
    },
    getAllIndustriesRequest: (state, action) => {
      state.getAllIndustries.status = "pending";
    },
    getAllIndustriesSuccess: (state, action) => {
      state.getAllIndustries.status = "success";
      state.getAllIndustries.data = action.payload;
    },
    getAllIndustriesFailure: (state, action) => {
      state.getAllIndustries.status = "failed";
      state.getAllIndustries.error = action.payload;
    },
    createIndustryRequest: (state, action) => {
      state.createIndustry.status = "pending";
    },
    createIndustrySuccess: (state, action) => {
      state.createIndustry.status = "success";
      state.createIndustry.data = action.payload;
    },
    createIndustryFailure: (state, action) => {
      state.createIndustry.status = "failed";
      state.createIndustry.data = null;
      state.createIndustry.error = action.payload;
    },
    updateIndustryRequest: (state, action) => {
      state.updateIndustry.status = "pending";
    },
    updateIndustrySuccess: (state, action) => {
      state.updateIndustry.status = "success";
      state.updateIndustry.data = action.payload;
    },
    updateIndustryFailure: (state, action) => {
      state.updateIndustry.status = "failed";
      state.updateIndustry.error = action.payload;
    },
    deleteIndustryRequest: (state) => {
      state.deleteIndustry.status = "pending";
    },
    deleteIndustrySuccess: (state, action) => {
      state.deleteIndustry.status = "success";
      state.deleteIndustry.data = action.payload;
    },
    deleteIndustryFailure: (state, action) => {
      state.deleteIndustry.status = "failed";
      state.deleteIndustry.error = action.payload;
    },
    clearGetIndustryStatus: (state) => {
      state.getIndustry.status = "idle";
    },
    clearGetIndustryData: () => {
      state.getIndustry.data = null;
    },
    clearGetIndustryError: (state) => {
      state.getIndustry.error = null;
    },
    clearGetAllIndustriesStatus: (state) => {
      state.getAllIndustries.status = "idle";
    },
    clearGetAllIndustriesData: () => {
      state.getAllIndustries.data = null;
    },
    clearGetAllIndustriesError: (state) => {
      state.getAllIndustries.error = null;
    },
    clearCreateIndustryStatus: (state) => {
      state.createIndustry.status = "idle";
    },
    clearCreateIndustryData: () => {
      state.createIndustry.data = null;
    },
    clearCreateIndustryError: (state) => {
      state.createIndustry.error = null;
    },
    clearUpdateIndustryStatus: (state) => {
      state.updateIndustry.status = "idle";
    },
    clearUpdateIndustryData: () => {
      state.updateIndustry.data = null;
    },
    clearUpdateIndustryError: (state) => {
      state.updateIndustry.error = null;
    },
    clearDeleteIndustryStatus: (state) => {
      state.deleteIndustry.status = "idle";
    },
    clearDeleteIndustryData: () => {
      state.deleteIndustry.data = null;
    },
    clearDeleteIndustryError: (state) => {
      state.deleteIndustry.error = null;
    },
    updateIndustryList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure `state.getAllUsers.data.users` exists and is an array
      if (!Array.isArray(state.getAllIndustries?.data?.data)) {
        state.getAllIndustries.data = {
          ...state.getAllIndustries.data,
          data: [],
        };
      }

      switch (type) {
        case "add": {
          state.getAllIndustries.data.data = [
            payload,
            ...state.getAllIndustries.data.data,
          ];
          break;
        }

        case "update": {
          const index = state.getAllIndustries.data.data.findIndex(
            (industry) => {
              return industry._id.toString() === payload?._id.toString();
            }
          );
          if (index !== -1) {
            state.getAllIndustries.data.data[index] = payload;
          }
          break;
        }

        case "delete": {
          state.getAllIndustries.data.data =
            state.getAllIndustries.data.data.filter(
              (industry) => industry._id.toString() !== payload._id.toString()
            );
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const industryActions = industrySlice.actions;
export const industryReducer = industrySlice.reducer;
