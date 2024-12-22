import axios from "axios";
import { leaderboardActions } from "@/redux/slices/dashboardSlice";
import { serverURL } from "@/config/config";
const route = `${serverURL}/dashboards/leader-board`

export const getLeaderboard = () => async (dispatch) => {
    try {
        console.log("get-leaderboard-data-req");
        dispatch(leaderboardActions.getLeaderboardRequest());

        const response = await axios.post(`${route}?`, null, {
            withCredentials: true,
        });
        console.log('get-leaderboard-details-res-data', response.data);
        dispatch(leaderboardActions.getLeaderboardSuccess(response.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(leaderboardActions.getLeaderboardFailure(errorMessage));
    }
};
