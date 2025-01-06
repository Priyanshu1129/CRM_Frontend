import { axiosRequest } from "@/utilities/axiosHelper";
import { trendViewActions } from "@/redux/slices/dashboardSlice/trendView";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/trend-view`;

export const getTrendView =
  ({
    particularDate,
    industry = "",
    subIndustry = "",
    territory = "",
    solution = "",
    enteredBy = "",
    myView = false,
  }) =>
  async (dispatch) => {
    try {
      console.log("get-trendView-data-req", solution);
      dispatch(trendViewActions.getTrendViewRequest());

      // Using axiosRequest helper for POST request to get the pipe view data
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for POST request
        `${route}?myView=false`, // Endpoint to fetch pipe view data
        { particularDate }, // POST data (body)
        { industry, subIndustry, territory, solution, enteredBy } // Query parameters
      );

      console.log("get-trendView-details-res-data", response);
      dispatch(trendViewActions.getTrendViewSuccess(response)); // Dispatch success action
    } catch (error) {
      dispatch(
        trendViewActions.getTrendViewFailure(error.message || "An error occurred")
      );
      console.log("error", error);
    }
  };

export const getMyTrendView =
  ({
    particularDate,
    industry = "",
    subIndustry = "",
    territory = "",
    solution = "",
    enteredBy = "",
    myView = false,
  }) =>
  async (dispatch) => {
    try {
      console.log("get-my-trendView-data-req", solution);
      dispatch(trendViewActions.getMyTrendViewRequest());

      // Using axiosRequest helper for POST request to get the user's pipe view data
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for POST request
        `${route}?myView=true`, // Endpoint to fetch my pipe view data
        { particularDate }, // POST data (body)
        { industry, subIndustry, territory, solution, enteredBy } // Query parameters
      );

      console.log("get-my-trendView-details-res-data", response);
      dispatch(trendViewActions.getMyTrendViewSuccess(response)); // Dispatch success action
    } catch (error) {
      dispatch(
        trendViewActions.getMyTrendViewFailure(
          error.message || "An error occurred"
        )
      );
      console.log("error", error);
    }
  };
