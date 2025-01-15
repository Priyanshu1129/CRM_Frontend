import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { clientActions } from "@/redux/slices/clientSlice";
import { deleteClient } from "@/redux/actions/clientAction";
import { useRouter } from "next/navigation";

export const useDeleteClient = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { status, data, error } = useSelector(
    (state) => state.client.deleteClient
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `${data?.confirm ? "client and related entities deleted successfully" : "Items to be deleted fetched successfully"}`,
      });
      dispatch(clientActions.clearDeleteClientError());
      dispatch(clientActions.clearDeleteClientStatus());
      if(data?.confirm == true) router.push('/client'); 
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to ${data?.confirm? "delete client and related entries" : "fetch Delete client and related data"}`,
      });
      dispatch(clientActions.clearDeleteClientStatus());
      dispatch(clientActions.clearDeleteClientError());
    }
  }, [status, error, dispatch]);

  const handleDeleteClient = (clientId, confirm = 'false') => {
      dispatch(deleteClient(clientId, confirm));
  };

  return {loading, data, handleDeleteClient};
};
