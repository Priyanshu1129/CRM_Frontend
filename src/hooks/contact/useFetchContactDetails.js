import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "@/redux/slices/contactSlice";
import { getContact } from "@/redux/actions/contactAction";

export const useFetchContactDetails = (id) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector(
        (state) => state.contact.getContact
    );
    const [contact, setContact] = useState(data?.data);

    const fetchContactDetails = useCallback(() => {
        if ((!contact && id) || id !== String(contact?._id)) {
            dispatch(getContact(id));
        }
    }, [dispatch, id, contact]);

    useEffect(() => {
        fetchContactDetails();
    }, [fetchContactDetails]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setContact(data?.data);
            setLoading(false);
            dispatch(contactActions.clearGetContactStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch contact.",
            });
            dispatch(contactActions.clearGetContactStatus());
            dispatch(contactActions.clearGetContactError());
        }
    }, [status, error, data?.data, dispatch]);

    return {
        loading,
        contact
    }
}