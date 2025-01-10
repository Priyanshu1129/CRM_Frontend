import { useDispatch, useSelector } from "react-redux";
import { setNewPasswordAction } from "@/redux/actions/authAction";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { forgotPasswordActions } from "@/redux/slices/forgotPasswordSlice";

export const useSetNewPassword = (inputEmail) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = useSelector((state) => state.forgotPassword.verifyOTP);

  const { status, error } = useSelector(
    (state) => state.forgotPassword.setNewPassword
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      router.push("/login");
      notification.success({
        description: "Password updated successfully",
      });
      dispatch(forgotPasswordActions.clearSetNewPasswordStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description:
          error || "Something went wrong while changing the password.",
      });
      dispatch(forgotPasswordActions.clearSetNewPasswordStatus());
      dispatch(forgotPasswordActions.clearSetNewPasswordError());
    }
  }, [status, error, dispatch, data]);

  const onFinish = (values) => {
    dispatch(
      setNewPasswordAction({ ...values, email: inputEmail, otp: data.otp })
    );
  };

  return { loading, status, onFinish };
};
