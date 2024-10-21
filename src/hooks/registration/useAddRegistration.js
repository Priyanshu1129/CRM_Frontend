import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRegistration } from "@/redux/actions/registrationAction";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { notification } from "antd";

export const useAddRegistration = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, error } = useSelector(
        (state) => state.registration.createRegistration
    );

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Registration added successfully.",
            });
            dispatch(registrationActions.clearCreateRegistrationStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to add registration.",
            });
            dispatch(registrationActions.clearCreateRegistrationStatus());
            dispatch(registrationActions.clearCreateRegistrationError());
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        setLoading(true);

        const formattedValues = {
            ...values,
            registrationDate: values.registrationDate?.format("YYYY-MM-DD"),
            expiryDate: values.expiryDate?.format("YYYY-MM-DD"),
            entryDate: new Date().toISOString(),
            websiteDetails: {
                link: values?.link || null,
                username: values?.username || null,
                password: values?.password || null,
            },
        };
        dispatch(createRegistration(formattedValues));
    };

    return { loading, onFinish };
}