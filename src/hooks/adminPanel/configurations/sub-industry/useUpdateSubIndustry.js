import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  getAllSubIndustries,
  updateSubIndustry,
} from "@/redux/actions/configurationAction";
import { subIndustryActions } from "@/redux/slices/configurationSlice";

export const useUpdateSubIndustry = ({
  updateConfigData,
  setShowUpdateConfigPopup,
}) => {
  const subIndustry = updateConfigData;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.subIndustry.updateSubIndustry
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Sub Industry updated successfully.",
      });
      dispatch(getAllSubIndustries());
      dispatch(subIndustryActions.clearUpdateSubIndustryStatus());
      setShowUpdateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update Sub Industry",
      });
      dispatch(subIndustryActions.clearUpdateSubIndustryStatus());
      dispatch(subIndustryActions.clearUpdateSubIndustryError());
      setShowUpdateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    if (subIndustry.label != values.label)
      dispatch(updateSubIndustry(values, subIndustry._id));
  };

  return { loading, onFinish };
};
