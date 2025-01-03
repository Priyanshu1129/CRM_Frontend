import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { getAllEntities } from "@/redux/actions/roleAndPermissionAction";
import { notification } from "antd";

export const useFetchAllEntities = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, error, data } = useSelector(
    (state) => state.role.getAllEntities
  );

  const [permissionEntities, setPermissionEntities] = useState(data?.data);

  const fetchEntities = useCallback(() => {
    if (!permissionEntities) {
      console.log("fetching permission entities");
      dispatch(getAllEntities());
    } else {
      console.log("permissionEntities already available");
    }
  }, [dispatch, permissionEntities]);

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setPermissionEntities(data);
      setLoading(false);
      dispatch(roleActions.clearGetAllEntitiesStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch entities.",
      });
      dispatch(roleActions.clearGetAllEntitiesStatus());
      dispatch(roleActions.clearGetAllEntitiesError());
    }
  }, [status, error, data, dispatch]);

  return { loading, permissionEntities };
};
