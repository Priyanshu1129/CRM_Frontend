import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "@/redux/actions/authAction";
import { notification } from "antd";
import { forgotPasswordActions } from "@/redux/slices/forgotPasswordSlice";

export const useforgotPassword = (setInputEmail) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const { status, error } = useSelector(
    (state) => state.forgotPassword.forgotPassword
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setEmailVerified(true);
      dispatch(forgotPasswordActions.clearForgotPasswordStatus());
    } else if (status === "failed") {
      setLoading(false);
      setEmailVerified(false);
      setInputEmail(null);
      notification.error({
        message: "Error",
        description: error || "Invalid Email or Server Error",
      });
      dispatch(forgotPasswordActions.clearForgotPasswordStatus());
      dispatch(forgotPasswordActions.clearForgotPasswordError());
    }
  }, [status, error, dispatch, setInputEmail]);

  const handleSendOtp = (email) => {
    dispatch(forgotPasswordAction({ email }));
  };

  return {
    emailVerified,
    loading,
    handleSendOtp,
  };
};
