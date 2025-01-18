import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  createSubSolution,
  getAllSubSolutions,
} from "@/redux/actions/configurationAction";
import { subSolutionActions } from "@/redux/slices/configurationSlice";

export const useCreateSubSolution = ({ setShowCreateConfigPopup }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.subSolution.createSubSolution
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Sub Solution Created successfully.",
      });
      dispatch(subSolutionActions.clearCreateSubSolutionStatus());
      setShowCreateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to create Sub  Soution",
      });
      dispatch(subSolutionActions.clearCreateSubSolutionStatus());
      dispatch(subSolutionActions.clearCreateSubSolutionError());
      setShowCreateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(createSubSolution(values));
  };

  return { loading, onFinish };
};
