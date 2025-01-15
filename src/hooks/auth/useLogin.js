import { useEffect, useState } from "react";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/slices/authSlice";
import { login } from "@/redux/actions/authAction";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.auth.login);

  const router = useRouter();

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      router.push("/");
      dispatch(authActions.checkAuthSuccess(data));
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Incorrect Credentials!",
      });
      dispatch(authActions.clearAuthDetailsStatus());
      dispatch(authActions.clearAuthDetailsError());
    }
  }, [status, error, dispatch, router]);

  const getLogin = (values) => {
    dispatch(login(values));
  };
  return { loading, getLogin };
};
