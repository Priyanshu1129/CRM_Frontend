import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  createSolution,
  getAllSolutions,
} from "@/redux/actions/configurationAction";
import { solutionActions } from "@/redux/slices/configurationSlice";
export const useCreateSolution = ({ setShowCreateConfigPopup }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.solution.createSolution
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Solution Created successfully.",
      });
      dispatch(getAllSolutions());
      dispatch(solutionActions.clearCreateSolutionStatus());
      setShowCreateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to create Solution",
      });
      dispatch(solutionActions.clearCreateSolutionStatus());
      dispatch(solutionActions.clearCreateSolutionError());
      setShowCreateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(createSolution(values));
  };

  return { loading, onFinish };
};
