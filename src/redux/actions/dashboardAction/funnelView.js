import { axiosRequest } from "@/utilities/axiosHelper";
import { funnelViewActions } from "@/redux/slices/dashboardSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/funnel-view`;

export const getFunnelView =
  ({
    particularDate,
    industry = "",
    subIndustry = "",
    territory = "",
    solution = "",
    enteredBy = "",
    startDate = null,
    endDate = null,
  }) =>
  async (dispatch) => {
    try {
      console.log("get-funnelView-data-req", solution, particularDate);
      dispatch(funnelViewActions.getFunnelViewRequest());

      // Using axiosRequest helper for POST request to get the funnel view data
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for POST request
        `${route}?myView=false`, // Endpoint to fetch funnel view data
        { particularDate }, // POST data (body)
        { industry, subIndustry, territory, solution, enteredBy } // Query parameters
      );

      console.log("get-funnelView-details-res-data", response);
      dispatch(funnelViewActions.getFunnelViewSuccess(response)); // Dispatch success action
    } catch (error) {
      dispatch(
        funnelViewActions.getFunnelViewFailure(
          error.message || "An error occurred"
        )
      );
      console.log("error", error);
    }
  };

export const getMyFunnelView =
  ({
    particularDate,
    industry = "",
    subIndustry = "",
    territory = "",
    solution = "",
    enteredBy = "",
    startDate = null,
    endDate = null,
  }) =>
  async (dispatch) => {
    try {
      console.log("get-my-funnelView-data-req", solution, particularDate);
      dispatch(funnelViewActions.getMyFunnelViewRequest());

      // Using axiosRequest helper for POST request to get the user's funnel view data
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for POST request
        `${route}?myView=true`, // Endpoint to fetch my funnel view data
        { particularDate }, // POST data (body)
        { industry, subIndustry, territory, solution, enteredBy } // Query parameters
      );

      console.log("get-my-funnelView-details-res-data", response);
      dispatch(funnelViewActions.getMyFunnelViewSuccess(response)); // Dispatch success action
    } catch (error) {
      dispatch(
        funnelViewActions.getMyFunnelViewFailure(
          error.message || "An error occurred"
        )
      );
      console.log("error", error);
    }
  };
