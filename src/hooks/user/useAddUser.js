import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { createUser } from "@/redux/actions/userAction/user";
import { userActions } from "@/redux/slices/userSlice";
import { countryCode } from "@/config/data";

export const useAddUser = () => {
  const [loading, setLoading] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user.createUser);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "User created successfully.",
      });
      dispatch(userActions.clearCreateUserStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add user.",
      });
      dispatch(userActions.clearCreateUserStatus());
      dispatch(userActions.clearCreateUserError());
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
    const formattedValues = {
      ...values,
      avatar: avatarChanged ? avatar : null,
      phoneCountryCode,
    };
    setLoading(true);
    console.log(values);
    console.log(formattedValues);
    dispatch(createUser(formattedValues));
  };

  return {
    handleAvatarChange,
    onFinish,
    loading,
    phoneCountryCode,
    setPhoneCountryCode,
  };
};
