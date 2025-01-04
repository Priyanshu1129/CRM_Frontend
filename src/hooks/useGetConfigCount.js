import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfigCounts } from "@/redux/actions/configurationAction";
import { notification } from "antd";

export const useGetConfigCount = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.configuration.getConfigCounts
  );
  const [counts, setCounts] = useState(data?.data);

  const fetchAllConfigCounts = useCallback(() => {
    if (!data) {
      dispatch(getConfigCounts());
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchAllConfigCounts();
  }, [fetchAllConfigCounts]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setCounts(data?.data);
      setLoading(false);
    } else if (status === "failed") {
      notification.error({
        message: "Error",
        description: error || "Failed to  fetch Config Counts",
      });
      setLoading(false);
    }
  }, [status, data]);

  return { counts, loading };
};
