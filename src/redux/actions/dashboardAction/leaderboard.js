import { axiosRequest } from "@/utilities/axiosHelper";
import { leaderboardActions } from "@/redux/slices/dashboardSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/leader-board`;

export const getLeaderboard = () => async (dispatch) => {
  try {
    console.log("get-leaderboard-data-req");
    dispatch(leaderboardActions.getLeaderboardRequest());

    // Using axiosRequest helper to make the POST request
    const response = await axiosRequest(
      dispatch,
      "POST", // HTTP method for POST request
      `${route}?`, // Endpoint to fetch leaderboard data
      null, // No POST data (null in this case)
      null // No query parameters in this case
    );

    console.log("get-leaderboard-details-res-data", response);
    dispatch(leaderboardActions.getLeaderboardSuccess(response)); // Dispatch success action
  } catch (error) {
    dispatch(
      leaderboardActions.getLeaderboardFailure(
        error.message || "An error occurred"
      )
    );
    console.log("error", error);
  }
};
