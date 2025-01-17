import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  getAllSolutions,
  updateSolution,
} from "@/redux/actions/configurationAction";
import { solutionActions } from "@/redux/slices/configurationSlice";

export const useUpdateSolution = ({
  updateConfigData,
  setShowUpdateConfigPopup,
}) => {
  const solution = updateConfigData;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.solution.updateSolution
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Solution updated successfully.",
      });
      dispatch(solutionActions.clearUpdateSolutionStatus());
      setShowUpdateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update Solution",
      });
      dispatch(solutionActions.clearUpdateSolutionStatus());
      dispatch(solutionActions.clearUpdateSolutionError());
      setShowUpdateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    if (solution.label != values.label)
      dispatch(updateSolution(values, solution._id));
  };

  return { loading, onFinish };
};
