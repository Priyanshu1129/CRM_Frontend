import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { leaderboardActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";
import { getLeaderboard } from "@/redux/actions/dashboardAction";

export const useFetchLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const { status, data, error } = useSelector(
    (state) => state.leaderboard.getLeaderboard
  );
  const [leaderboardData, setLeaderboardData] = useState(data?.data);

  const fetchLeaderboard = useCallback(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    if (refresh) {
      fetchLeaderboard();
    }
    setRefresh(false);
  }, [refresh, fetchLeaderboard]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLeaderboardData(data?.data);
      setLoading(false);
      dispatch(leaderboardActions.clearGetLeaderboardStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch leaderboard data.",
      });
      dispatch(leaderboardActions.clearGetLeaderboardStatus());
      dispatch(leaderboardActions.clearGetLeaderboardError());
    }
  }, [status, data, error, dispatch]);

  return { loading, leaderboardData, setRefresh };
};
