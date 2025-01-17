"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { solutionActions } from "@/redux/slices/configurationSlice";
import { deleteSolution } from "@/redux/actions/configurationAction";
import { useRouter } from "next/navigation";

export const useDeleteSolution = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  const { status, data, error } = useSelector(
    (state) => state.solution.deleteSolution
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `solution deleted successfully `,
      });
      dispatch(solutionActions.clearDeleteSolutionError());
      dispatch(solutionActions.clearDeleteSolutionStatus());
      dispatch(configurationActions.resetDeleteConfigPopup());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to Delete Solution`,
      });
      dispatch(solutionActions.clearDeleteSolutionStatus());
      dispatch(solutionActions.clearDeleteSolutionError());
    }
  }, [status, error, dispatch]);

  const handleDeleteSolution = (solutionId, confirm = 'true', undo = 'false') => {
      dispatch(deleteSolution(solutionId, confirm, undo));
  };

  return {loading, data, handleDeleteSolution};
};
