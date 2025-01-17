"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { subSolutionActions } from "@/redux/slices/configurationSlice";
import { deleteSubSolution } from "@/redux/actions/configurationAction";
import { useRouter } from "next/navigation";

export const useDeleteSubSolution = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  const { status, data, error } = useSelector(
    (state) => state.subSolution.deleteSubSolution
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `subSolution deleted successfully `,
      });
      dispatch(subSolutionActions.clearDeleteSubSolutionError());
      dispatch(subSolutionActions.clearDeleteSubSolutionStatus());
      dispatch(configurationActions.resetDeleteConfigPopup());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to Delete SubSolution`,
      });
      dispatch(subSolutionActions.clearDeleteSubSolutionStatus());
      dispatch(subSolutionActions.clearDeleteSubSolutionError());
    }
  }, [status, error, dispatch]);

  const handleDeleteSubSolution = (subSolutionId, confirm = 'true', undo = 'false') => {
      dispatch(deleteSubSolution(subSolutionId, confirm, undo));
  };

  return {loading, data, handleDeleteSubSolution};
};
