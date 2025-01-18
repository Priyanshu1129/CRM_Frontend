"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { territoryActions } from "@/redux/slices/configurationSlice";
import { deleteTerritory } from "@/redux/actions/configurationAction";
import { useRouter } from "next/navigation";

export const useDeleteTerritory = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  const { status, data, error } = useSelector(
    (state) => state.territory.deleteTerritory
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `territory deleted successfully `,
      });
      dispatch(territoryActions.clearDeleteTerritoryError());
      dispatch(territoryActions.clearDeleteTerritoryStatus());
      dispatch(configurationActions.resetDeleteConfigPopup());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to Delete Territory`,
      });
      dispatch(territoryActions.clearDeleteTerritoryStatus());
      dispatch(territoryActions.clearDeleteTerritoryError());
    }
  }, [status, error, dispatch]);

  const handleDeleteTerritory = (territoryId, confirm = 'true', undo = 'false') => {
      dispatch(deleteTerritory(territoryId, confirm, undo));
  };

  return {loading, data, handleDeleteTerritory};
};
