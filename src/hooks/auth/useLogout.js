import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { authActions } from "@/redux/slices/authSlice";
import { logout } from "@/redux/actions/authAction";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.auth.logout);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      dispatch(authActions.clearLogoutStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to logout.",
      });
      dispatch(authActions.clearLogoutStatus());
      dispatch(authActions.clearLogoutError());
    }
  }, [status, error, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return { loading, handleLogout };
};
