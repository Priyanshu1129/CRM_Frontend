import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { authActions } from "@/redux/slices/authSlice";
import { changePassword } from "@/redux/actions/authAction";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.auth.changePassword);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      router.push("/home");

      notification.success({
        message: "Success",
        description: "Your password has been changed successfully!",
      });
    } else if (status === "failed") {
      setLoading(false);

      notification.error({
        message: "Error",
        description:
          error || "Something went wrong while changing the password.",
      });

      dispatch(authActions.clearAuthDetailsStatus());
      dispatch(authActions.clearAuthDetailsError());
    }
  }, [status, error, dispatch, router]);

  const handleSubmit = (data) => {
    dispatch(changePassword(data));
  };

  return { handleSubmit, loading, status };
};
