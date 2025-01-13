import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "@/redux/slices/clientSlice";
import { createClient } from "@/redux/actions/clientAction";
import { notification } from "antd";
import { convertCurrency } from "@/utilities/convertCurrency";

export const useAddClient = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.client.createClient);
  const { currency } = useSelector((state) => state.currency.viewCurrency);

  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Client added successfully.",
      });
      dispatch(clientActions.clearCreateClientStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add client.",
      });
      dispatch(clientActions.clearCreateClientStatus());
      dispatch(clientActions.clearCreateClientError());
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
    const annualRevenueInUSD = convertCurrency({
      value: values?.annualRevenue,
      selectedCurrency: currency?.value,
      toUSD: true,
    });

    let newValues = {
      ...values,
      annualRevenue: annualRevenueInUSD,
      entryDate: new Date().toISOString(),
      avatar: avatarChanged ? avatar : null,
    };
    dispatch(createClient(newValues));
  };

  return {
    loading,
    handleAvatarChange,
    onFinish,
  };
};
