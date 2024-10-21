import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { getRegistration } from "@/redux/actions/registrationAction";
import { notification } from "antd";

export const useFetchRegistrationDetails = (id) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector(
        (state) => state.registration.getRegistration
    );
    const [registration, setRegistration] = useState(data?.data);

    const fetchRegistrationDetails = useCallback(() => {
        if ((!registration && id) || id !== String(registration?._id)) {
            dispatch(getRegistration(id));
        }
    }, [dispatch, id, registration]);

    useEffect(() => {
        fetchRegistrationDetails();
    }, [fetchRegistrationDetails]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setRegistration(data?.data);
            setLoading(false);
            dispatch(registrationActions.clearGetRegistrationStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch registration.",
            });
            dispatch(registrationActions.clearGetRegistrationStatus());
            dispatch(registrationActions.clearGetRegistrationError());
        }
    }, [status, error, data?.data, dispatch]);

    return { loading, registration }
}