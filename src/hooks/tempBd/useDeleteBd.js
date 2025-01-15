import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { deleteBusinessDevelopment } from "@/redux/actions/businessDevelopmentAction";
import { useRouter } from "next/navigation";

export const useDeleteBusinessDevelopment = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()

  const { status, data, error } = useSelector(
    (state) => state.businessDevelopment.deleteBusinessDevelopment
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
        console.log("data is success -----------", data)
      setLoading(false);
      notification.success({
        message: "Success",
        description: `${data?.data?.confirm ? "businessDevelopment and related entities deleted successfully" : "Items to be deleted fetched successfully"}`,
      });
      dispatch(businessDevelopmentActions.clearDeleteBusinessDevelopmentError());
      dispatch(businessDevelopmentActions.clearDeleteBusinessDevelopmentStatus());
      if(data?.data?.confirm == true) router.push('/mention')

    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to ${data?.data?.confirm ? "fetch deletion BD data to be deleted" : "Delete BD and related data"}`,
      });
      dispatch(businessDevelopmentActions.clearDeleteBusinessDevelopmentStatus());
      dispatch(businessDevelopmentActions.clearDeleteBusinessDevelopmentError());
    }
  }, [status, error, dispatch]);

  const handleDeleteBusinessDevelopment = (businessDevelopmentId, confirm = 'false') => {
      dispatch(deleteBusinessDevelopment(businessDevelopmentId, confirm));
  };

  return {loading, data, handleDeleteBusinessDevelopment};
};
