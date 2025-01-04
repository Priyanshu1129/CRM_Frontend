import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  getAllSolutions,
  updateSubSolution,
} from "@/redux/actions/configurationAction";
import { subSolutionActions } from "@/redux/slices/configurationSlice";

export const useUpdateSubSolution = ({
  updateConfigData,
  setShowUpdateConfigPopup,
}) => {
  const subSolution = updateConfigData;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.subSolution.updateSubSolution
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Sub Solution updated successfully.",
      });
      dispatch(getAllSolutions());
      dispatch(subSolutionActions.clearUpdateSubSolutionStatus());
      setShowUpdateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update Sub Solution",
      });
      dispatch(subSolutionActions.clearUpdateSubSolutionStatus());
      dispatch(subSolutionActions.clearUpdateSubSolutionError());
      setShowUpdateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    if (subSolution.label != values.label)
      dispatch(updateSubSolution(values, subSolution._id));
  };

  return { loading, onFinish };
};
