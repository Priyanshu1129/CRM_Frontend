import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd"; // Import notification from Ant Design or similar
import { getAllTargets } from "@/redux/actions/target";
import { targetActions } from "@/redux/slices/targetSlice";

export const useFetchAllTargets = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, error, data } = useSelector(
    (state) => state.target.getAllTargets
  );

  const handleGetTargets = useCallback(
    (entityType, year) => {
      dispatch(getAllTargets(entityType, year));
    },
    [dispatch]
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Targets fetched successfully.",
      });
      dispatch(targetActions.clearGetAllTargetsError());
      dispatch(targetActions.clearGetAllTargetsStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch targets.",
      });
      dispatch(targetActions.clearGetAllTargetsError());
      dispatch(targetActions.clearGetAllTargetsStatus());
    }
  }, [status, error, dispatch]);

  const transformedTargets = useMemo(() => {
    return data || null;
  }, [data]);

  return { targets: transformedTargets, loading, handleGetTargets };
};
