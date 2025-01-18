import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { createSubIndustry } from "@/redux/actions/configurationAction";
import { subIndustryActions } from "@/redux/slices/configurationSlice";

export const useCreateSubIndustry = ({
  territory,
  setShowCreateConfigPopup,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.subIndustry.createSubIndustry
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Sub Industry Created successfully.",
      });
      dispatch(subIndustryActions.clearCreateSubIndustryStatus());
      setShowCreateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to create Sub Industry",
      });
      dispatch(subIndustryActions.clearCreateSubIndustryStatus());
      dispatch(subIndustryActions.clearCreateSubIndustryError());
      setShowCreateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(createSubIndustry(values));
  };

  return { loading, onFinish };
};
