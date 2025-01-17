"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { subIndustryActions } from "@/redux/slices/configurationSlice";
import { deleteSubIndustry } from "@/redux/actions/configurationAction";
import { useRouter } from "next/navigation";

export const useDeleteSubIndustry = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  const { status, data, error } = useSelector(
    (state) => state.subIndustry.deleteSubIndustry
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `subIndustry deleted successfully `,
      });
      dispatch(subIndustryActions.clearDeleteSubIndustryError());
      dispatch(subIndustryActions.clearDeleteSubIndustryStatus());
      dispatch(configurationActions.resetDeleteConfigPopup());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to Delete SubIndustry`,
      });
      dispatch(subIndustryActions.clearDeleteSubIndustryStatus());
      dispatch(subIndustryActions.clearDeleteSubIndustryError());
    }
  }, [status, error, dispatch]);

  const handleDeleteSubIndustry = (subIndustryId, confirm = 'true', undo = 'false') => {
      dispatch(deleteSubIndustry(subIndustryId, confirm, undo));
  };

  return {loading, data, handleDeleteSubIndustry};
};
