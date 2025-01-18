"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { industryActions } from "@/redux/slices/configurationSlice";
import { deleteIndustry } from "@/redux/actions/configurationAction";
import { useRouter } from "next/navigation";

export const useDeleteIndustry = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { status, data, error } = useSelector(
    (state) => state.industry.deleteIndustry
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `industry deleted successfully `,
      });
      dispatch(industryActions.clearDeleteIndustryError());
      dispatch(industryActions.clearDeleteIndustryStatus());
      dispatch(configurationActions.resetDeleteConfigPopup());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to Delete Industry`,
      });
      dispatch(industryActions.clearDeleteIndustryStatus());
      dispatch(industryActions.clearDeleteIndustryError());
    }
  }, [status, error, dispatch]);

  const handleDeleteIndustry = (
    industryId,
    confirm = "true",
    undo = "false"
  ) => {
    dispatch(deleteIndustry(industryId, confirm, undo));
  };

  return { loading, data, handleDeleteIndustry };
};
