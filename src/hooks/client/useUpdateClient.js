import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "@/redux/slices/clientSlice";
import { updateClient, getAllClients } from "@/redux/actions/clientAction";
import { getChangedValues } from "@/utilities/getChangedValues";
import { notification } from "antd";

export const useUpdateClient = ({ client, currency, form }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, error } = useSelector((state) => state.client.updateClient);

    const initialValues = useRef({});
    const [avatarChanged, setAvatarChanged] = useState(false);
    const [avatar, setAvatar] = useState(null);


    useEffect(() => {
        if (client) {
            const clientInitialValues = {
                name: client.name,
                industry: client.industry,
                territory: client.territory,
                subIndustry: client.subIndustry,
                offering: client.offering,
                incorporationType: client.incorporationType,
                listedCompany: client.listedCompany,
                marketCap: client.marketCap,
                annualRevenue: client.annualRevenue * currency,
                classification: client.classification,
                totalEmployeeStrength: client.totalEmployeeStrength,
                itEmployeeStrength: client.itEmployeeStrength,
                primaryRelationship: client.primaryRelationship,
                secondaryRelationship: client.secondaryRelationship,
                relationshipStatus: client.relationshipStatus,
                relatedContacts: client.relatedContacts,
                priority: client.priority,
                avatar: client.avatar,
                lifeTimeValue: client.lifeTimeValue * currency,
            };

            // Set initial form values
            form.setFieldsValue(clientInitialValues);
            initialValues.current = clientInitialValues;
        }
    }, [client, form, currency]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Client updated successfully.",
            });
            dispatch(getAllClients({}));
            dispatch(clientActions.clearUpdateClientStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update client.",
            });
            dispatch(clientActions.clearUpdateClientStatus());
            dispatch(clientActions.clearUpdateClientError());
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

        const changedValues = getChangedValues(initialValues, values);

        if (avatarChanged) {
            changedValues.avatar = avatar;
        }
        // Dispatch only if there are changed values
        if (Object.keys(changedValues).length > 0) {
            if (changedValues.annualRevenue) {
                changedValues.annualRevenue = parseFloat(
                    values?.annualRevenue / currency
                ).toFixed(2);
            }
            dispatch(updateClient(changedValues, client._id));
        } else {
            setLoading(false);
            notification.info({
                message: "No Changes",
                description: "No changes were made.",
            });
        }
    };

    return {loading, onFinish, handleAvatarChange}

}