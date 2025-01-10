import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAction } from "@/redux/actions/authAction";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { forgotPasswordActions } from "@/redux/slices/forgotPasswordSlice";

export const useVerifyOTP = (setIsOTPVerified, inputEmail) => {
  const dispatch = useDispatch();
  const { status, error, data } = useSelector(
    (state) => state.forgotPassword.verifyOTP
  );
  const [loading, setLoading] = useState(false);
  console.log("data-otp", data);
  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setIsOTPVerified(true);
      notification.success({
        message: "OTP Verified Successfully",
      });
      dispatch(forgotPasswordActions.clearVerifyOTPStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Invalid OTP",
      });
      dispatch(forgotPasswordActions.clearVerifyOTPStatus());
      dispatch(forgotPasswordActions.clearVerifyOTPError());
    }
  }, [status, error, dispatch, setIsOTPVerified]);

  const verifyOTP = (values) =>
    dispatch(verifyOtpAction({ ...values, email: inputEmail }));

  return { loading, verifyOTP, status };
};
