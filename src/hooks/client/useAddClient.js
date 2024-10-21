import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "@/redux/slices/clientSlice";
import { createClient } from "@/redux/actions/clientAction";
import { notification } from "antd";

export const useAddClient = ({ currency }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.client.createClient);

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
            // dispatch(clientActions.clearCreateClientData());
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
        setLoading(true);
        const annualRevenueInUSD = parseFloat(
            values?.annualRevenue / currency
        ).toFixed(2);

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
        onFinish
    }
}