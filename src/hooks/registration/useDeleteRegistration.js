"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { deleteRegistration } from "@/redux/actions/registrationAction";
import { useRouter } from "next/navigation";

export const useDeleteRegistration = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  //in data we will have data.confirm  to differentiate actions of actual deletion and fetching data to be deleted 

  const { status, data, error } = useSelector(
    (state) => state.registration.deleteRegistration
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
        console.log("Registration res in success : ", data)
      setLoading(false);
      notification.success({
        message: "Success",
        description: `${data?.data?.confirm ? "registration and related entities deleted successfully" : "Registration and related entries fetched successfully"}`,
      });
      dispatch(registrationActions.clearDeleteRegistrationError());
      dispatch(registrationActions.clearDeleteRegistrationStatus());
      if(data?.data?.confirm == true) router.push('/registration');
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to ${data?.data?.confirm ? "fetch data to be deleted" : "Delete Registration and related data"}`,
      });
      dispatch(registrationActions.clearDeleteRegistrationStatus());
      dispatch(registrationActions.clearDeleteRegistrationError());
    }
  }, [status, error, dispatch]);

  const handleDeleteRegistration = (registrationId, confirm = 'false') => {
      dispatch(deleteRegistration(registrationId, confirm));
  };

  return {loading, data, handleDeleteRegistration};
};
