import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { targetActions } from "@/redux/slices/targetSlice";
import { updateTarget } from "@/redux/actions/target";

export const useUpdateTarget = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, error, data } = useSelector(
    (state) => state.target.updateTarget
  );

  const handleUpdateTarget = useCallback(
    (entityType, entityId, year, targets) => {
      dispatch(updateTarget(entityType, entityId, year, targets));
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
        description: "Target updated successfully.",
      });
      dispatch(targetActions.clearUpdateTargetError());
      dispatch(targetActions.clearUpdateTargetStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update target.",
      });
      dispatch(targetActions.clearUpdateTargetError());
      dispatch(targetActions.clearUpdateTargetStatus());
    }
  }, [status, error, dispatch]);

  return { updatedTarget: data, loading, handleUpdateTarget };
};
