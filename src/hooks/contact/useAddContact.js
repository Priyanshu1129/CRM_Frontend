import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "@/redux/slices/contactSlice";
import { createContact } from "@/redux/actions/contactAction";
import { notification } from "antd";

export const useAddContact = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [mobileCountryCode, setMobileCountryCode] = useState("+1");

  const { status, error } = useSelector((state) => state.contact.createContact);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Contact added successfully.",
      });
      dispatch(contactActions.clearCreateContactStatus());
      // dispatch(contactActions.clearCreateContactData());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add contact.",
      });
      dispatch(contactActions.clearCreateContactStatus());
      dispatch(contactActions.clearCreateContactError());
    }
  }, [status, error, dispatch]);

  const handleAvatarChange = (fileList) => {
    if (fileList.length > 0) {
      const newAvatar = fileList[0].originFileObj || fileList[0].url;
      setAvatarChanged(true);
      setAvatar(newAvatar);
    } else {
      setAvatarChanged(false);
      setAvatar(null);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    console.log("values", values);
    let newValues = {
      ...values,
      entryDate: new Date().toISOString(),
      avatar: avatarChanged ? avatar : null,
      phoneCountryCode,
      mobileCountryCode,
    };
    console.log("submit", newValues);
    dispatch(createContact(newValues));
  };

  return {
    loading,
    phoneCountryCode,
    mobileCountryCode,
    setPhoneCountryCode,
    setMobileCountryCode,
    handleAvatarChange,
    onFinish,
  };
};
