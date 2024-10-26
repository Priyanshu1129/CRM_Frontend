import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";


export const useFetchRoleDetails = (id) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, error, data } = useSelector((state) => state.role.getRole);

    const [role, setRole] = useState(data?.data);

    const fetchRoleDetails = useCallback(() => {
        if ((!role && id) || id !== String(role?._id)) {
            dispatch(getRole(id));
        }
    }, [dispatch, id, role]);

    useEffect(() => {
        fetchRoleDetails();
    }, [fetchRoleDetails])

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setRole(data?.data);
            setLoading(false);
            dispatch(roleActions.clearGetRoleStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch role.",
            });
            dispatch(roleActions.clearGetRoleStatus());
            dispatch(roleActions.clearGetRoleError());
        }
    }, [status, error, data?.data, dispatch]);

    return { loading, role };
}