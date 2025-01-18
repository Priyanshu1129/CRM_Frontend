import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  getAllSalesStages,
  updateSalesStage,
} from "@/redux/actions/configurationAction";
import { salesStageActions } from "@/redux/slices/configurationSlice";

export const useUpdateSalesStage = ({
  updateConfigData,
  setShowUpdateConfigPopup,
}) => {
  const salesStage = updateConfigData;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.salesStage.updateSalesStage
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Sales Stage updated successfully.",
      });
      dispatch(salesStageActions.clearUpdateSalesStageStatus());
      setShowUpdateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update Sales Stage",
      });
      dispatch(salesStageActions.clearUpdateSalesStageStatus());
      dispatch(salesStageActions.clearUpdateSalesStageError());
      setShowUpdateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    if (salesStage.label != values.label)
      dispatch(updateSalesStage(values, salesStage._id));
  };

  return { loading, onFinish };
};
