import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { contactActions } from "@/redux/slices/contactSlice";
import { deleteContact } from "@/redux/actions/contactAction";
import { useRouter } from "next/navigation";

export const useDeleteContact = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()

  const { status, data, error } = useSelector(
    (state) => state.contact.deleteContact
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
        console.log("data is success -----------", data)
      setLoading(false);
      notification.success({
        message: "Success",
        description: `${data?.data?.confirm ? "contact and related entities deleted successfully" : "Items to be deleted fetched successfully"}`,
      });
      dispatch(contactActions.clearDeleteContactError());
      dispatch(contactActions.clearDeleteContactStatus());
      if(data?.data?.confirm == true) router.push('/contact')

    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to ${data?.data?.confirm ? "fetch deletion BD data to be deleted" : "Delete BD and related data"}`,
      });
      dispatch(contactActions.clearDeleteContactStatus());
      dispatch(contactActions.clearDeleteContactError());
    }
  }, [status, error, dispatch]);

  const handleDeleteContact = (contactId, confirm = 'false') => {
      dispatch(deleteContact(contactId, confirm));
  };

  return {loading, data, handleDeleteContact};
};
