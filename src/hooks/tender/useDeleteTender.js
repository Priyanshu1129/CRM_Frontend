"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { deleteTender } from "@/redux/actions/tenderAction";
import { useRouter } from "next/navigation";

export const useDeleteTender = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  //in data we will have data.confirm  to differentiate actions of actual deletion and fetching data to be deleted 

  const { status, data, error } = useSelector(
    (state) => state.tender.deleteTender
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `${data?.confirm ? "tender and related entities deleted successfully" : "Tender and related entries fetched successfully"}`,
      });
      dispatch(tenderActions.clearDeleteTenderError());
      dispatch(tenderActions.clearDeleteTenderStatus());
      if(data?.confirm == true) router.push('/tender');
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to ${data?.confirm ? "fetch data to be deleted" : "Delete Tender and related data"}`,
      });
      dispatch(tenderActions.clearDeleteTenderStatus());
      dispatch(tenderActions.clearDeleteTenderError());
    }
  }, [status, error, dispatch]);

  const handleDeleteTender = (tenderId, confirm = 'false') => {
      dispatch(deleteTender(tenderId, confirm));
  };

  return {loading, data, handleDeleteTender};
};
