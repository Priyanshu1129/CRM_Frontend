import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { systemConfigActions } from "@/redux/slices/systemSlice";
import { getChangedValues } from "@/utilities/getChangedValues";
import { updateSystemConfig } from "@/redux/actions/systemConfigAction.js";
import { notification } from "antd";
import { getSystemConfig } from "@/redux/actions/systemConfigAction.js";

export const useUpdateSystemConfig = ({ systemConfig, form, currency }) => {
  const [loading, setLoading] = useState(false);
  const { status, error } = useSelector(
    (state) => state.systemConfig.updateSystemConfig
  );
  const dispatch = useDispatch();
  const initialValues = useRef({});

  useEffect(() => {
    if (systemConfig) {
      const systemConfigInitialValues = {
        tenderSubmittedStage: systemConfig.tenderSubmittedStage,
        wonStage: systemConfig.wonStage,
      };
      form.setFieldsValue(systemConfigInitialValues);
      initialValues.current = systemConfigInitialValues;
    }
  }, [systemConfig, form, currency]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "SystemConfig updated successfully.",
      });
      dispatch(getSystemConfig({}));
      dispatch(systemConfigActions.clearUpdateSystemConfigStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update systemConfig.",
      });
      dispatch(systemConfigActions.clearUpdateSystemConfigStatus());
      dispatch(systemConfigActions.clearUpdateSystemConfigError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    const changedValues = getChangedValues(initialValues, values);
    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      setLoading(true);
      dispatch(updateSystemConfig(changedValues));
    } else {
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  return { loading, onFinish };
};
