import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  createSalesSubStage,
  getAllSalesSubStages,
} from "@/redux/actions/configurationAction";
import { salesSubStageActions } from "@/redux/slices/configurationSlice";

export const useCreateSalesSubStage = ({ setShowCreateConfigPopup }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.salesSubStage.createSalesSubStage
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Sales Sub Stage Created successfully.",
      });
      dispatch(salesSubStageActions.clearCreateSalesSubStageStatus());
      setShowCreateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to create Solution",
      });
      dispatch(salesSubStageActions.clearCreateSalesSubStageStatus());
      dispatch(salesSubStageActions.clearCreateSalesSubStageError());
      setShowCreateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(createSalesSubStage(values));
  };

  return { loading, onFinish };
};
