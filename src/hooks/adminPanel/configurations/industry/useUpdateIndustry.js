import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  getAllIndustries,
  updateIndustry,
} from "@/redux/actions/configurationAction";
import { industryActions } from "@/redux/slices/configurationSlice";

export const useUpdateIndustry = ({
  updateConfigData,
  setShowUpdateConfigPopup,
}) => {
  const industry = updateConfigData;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.industry.updateIndustry
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Industry updated successfully.",
      });
      dispatch(industryActions.clearUpdateIndustryStatus());
      setShowUpdateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update Industry",
      });
      dispatch(industryActions.clearUpdateIndustryStatus());
      dispatch(industryActions.clearUpdateIndustryError());
      setShowUpdateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    if (industry.label != values.label)
      dispatch(updateIndustry(values, industry._id));
  };

  return { loading, onFinish };
};
