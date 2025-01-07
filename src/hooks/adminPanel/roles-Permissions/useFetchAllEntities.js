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
      dispatch(getAllEntities());
    }
  }, [dispatch, permissionEntities]);

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      const customOrder = ["GET ALL", "READ", "CREATE", "UPDATE", "DELETE"];

      // Transform and sort the data
      const transformedData = data.map((item) => {
        // Create a shallow copy of the item to avoid modifying the original object
        const newItem = { ...item };

        if (
          newItem.actions.includes("CREATE") &&
          newItem.actions.includes("READ") &&
          newItem.actions.includes("UPDATE") &&
          newItem.actions.includes("DELETE") &&
          newItem.actions.includes("GET ALL")
        ) {
          // Rearrange to the custom order
          newItem.actions = customOrder;
        } else {
          // Sort alphabetically if the custom condition is not met
          newItem.actions = [...newItem.actions].sort((a, b) =>
            a.localeCompare(b)
          );
        }

        return newItem;
      });

      // Sort by labels
      const sortedData = transformedData.sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });

      setPermissionEntities(sortedData);
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
