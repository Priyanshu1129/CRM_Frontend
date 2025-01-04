import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  getAllSalesSubStages,
  updateSalesSubStage,
} from "@/redux/actions/configurationAction";
import { salesSubStageActions } from "@/redux/slices/configurationSlice";

export const useUpdateSalesSubStage = ({
  updateConfigData,
  setShowUpdateConfigPopup,
}) => {
  const salesSubStage = updateConfigData;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.salesSubStage.updateSalesSubStage
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Sales Sub Stage updated successfully.",
      });
      dispatch(getAllSalesSubStages());
      dispatch(salesSubStageActions.clearUpdateSalesSubStageStatus());
      setShowUpdateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update Sales Sub Stage",
      });
      dispatch(salesSubStageActions.clearUpdateSalesSubStageStatus());
      dispatch(salesSubStageActions.clearUpdateSalesSubStageError());
      setShowUpdateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(updateSalesSubStage(values, salesSubStage._id));
  };

  return { loading, onFinish };
};
