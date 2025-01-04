import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  createIndustry,
  getAllIndustries,
} from "@/redux/actions/configurationAction";
import { industryActions } from "@/redux/slices/configurationSlice";

export const useCreateIndustry = ({ industry, setShowCreateConfigPopup }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.industry.createIndustry
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Industry Created successfully.",
      });
      dispatch(getAllIndustries());
      dispatch(industryActions.clearCreateIndustryStatus());
      setShowCreateConfigPopup(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to create Industry",
      });
      dispatch(industryActions.clearCreateIndustryStatus());
      dispatch(industryActions.clearCreateIndustryError());
      setShowCreateConfigPopup(false);
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(createIndustry(values));
  };

  return { loading, onFinish };
};
