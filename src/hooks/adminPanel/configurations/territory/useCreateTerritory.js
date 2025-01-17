import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { createTerritory } from "@/redux/actions/configurationAction";
import { territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useCreateTerritory = ({ territory, setShowCreateConfigPopup }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.territory.createTerritory
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Territory Created successfully.",
      });
      dispatch(territoryActions.clearCreateTerritoriesStatus());
      setShowCreateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to create Territory",
      });
      dispatch(territoryActions.clearCreateTerritoriesStatus());
      dispatch(territoryActions.clearCreateTerritoryError());
      setShowCreateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(createTerritory(values));
  };

  return { loading, onFinish };
};
