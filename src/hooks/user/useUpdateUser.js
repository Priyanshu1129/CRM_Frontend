import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getAllUsers } from "@/redux/actions/userAction";
import { userActions } from "@/redux/slices/userSlice";
import { getChangedValues } from "@/utilities/getChangedValues";

export const useUpdateUser = ({ user, form }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { status, error } = useSelector((state) => state.user.updateUser);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const initialValues = useRef({});

  useEffect(() => {
    if (user) {
      const userInitialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        role: user.role,
        email: user.email,
        country: user.address?.country,
        state: user.address?.state,
        city: user.address?.city,
        avatar: user.avatar,
        phone: user.phone || "",
        phoneCountryCode: user.phoneCountryCode || "",
        industry: user?.industry,
        territory: user?.territory,
        solution: user?.solution,
      };
      setPhoneCountryCode(user.phoneCountryCode || phoneCountryCode);
      form.setFieldsValue(userInitialValues);
      initialValues.current = userInitialValues;
    }
  }, [user, form, setPhoneCountryCode]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    }
    if (status === "success") {
      notification.success({
        message: "Success",
        description: "User updated successfully.",
      });
      dispatch(getAllUsers({}));
      setLoading(false);
      dispatch(userActions.clearUpdateUserStatus());
    } else if (status === "failed") {
      notification.error({
        message: "Error",
        description: error || "Failed to update user.",
      });
      setLoading(false);
      dispatch(userActions.clearUpdateUserStatus());
      dispatch(userActions.clearUpdateUserError());
    }
  }, [status, error, dispatch]);

  const handleUpdateUser = (values) => {
    const changedValues = getChangedValues(initialValues, values);
    if (avatarChanged) changedValues.avatar = avatar;

    if (Object.keys(changedValues).length > 0) {
      setLoading(true);
      dispatch(updateUser(changedValues, user._id));
    } else {
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  return {
    loading,
    handleUpdateUser,
    setAvatar,
    setAvatarChanged,
    phoneCountryCode,
    setPhoneCountryCode,
  };
};
