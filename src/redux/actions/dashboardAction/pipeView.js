import { axiosRequest } from "@/utilities/axiosHelper";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/pipe-view`;

export const getPipeView =
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
      console.log("get-pipeView-data-req", solution);
      dispatch(pipeViewActions.getPipeViewRequest());

      // Using axiosRequest helper for POST request to get the pipe view data
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for POST request
        `${route}?myView=false`, // Endpoint to fetch pipe view data
        { particularDate }, // POST data (body)
        { industry, subIndustry, territory, solution, enteredBy } // Query parameters
      );

      console.log("get-pipeView-details-res-data", response);
      dispatch(pipeViewActions.getPipeViewSuccess(response)); // Dispatch success action
    } catch (error) {
      dispatch(
        pipeViewActions.getPipeViewFailure(error.message || "An error occurred")
      );
      console.log("error", error);
    }
  };

export const getMyPipeView =
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
      console.log("get-my-pipeView-data-req", solution);
      dispatch(pipeViewActions.getMyPipeViewRequest());

      // Using axiosRequest helper for POST request to get the user's pipe view data
      const response = await axiosRequest(
        dispatch,
        "POST", // HTTP method for POST request
        `${route}?myView=true`, // Endpoint to fetch my pipe view data
        { particularDate }, // POST data (body)
        { industry, subIndustry, territory, solution, enteredBy } // Query parameters
      );

      console.log("get-my-pipeView-details-res-data", response);
      dispatch(pipeViewActions.getMyPipeViewSuccess(response)); // Dispatch success action
    } catch (error) {
      dispatch(
        pipeViewActions.getMyPipeViewFailure(
          error.message || "An error occurred"
        )
      );
      console.log("error", error);
    }
  };
