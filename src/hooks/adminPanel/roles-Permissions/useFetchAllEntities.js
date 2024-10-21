import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import {
    getAllPermissionEntities,
} from "@/redux/actions/roleAndPermissionAction";
import { notification } from "antd";

export const useFetchAllEntities = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, error, data } = useSelector((state) => state.role.getAllPermissionEntities);

    const [permissionEntities, setPermissionEntities] = useState(data?.data);

    const fetchPermissionEntities = useCallback(() => {
        if (!permissionEntities) {
            console.log("fetching permission entities");
            dispatch(getAllPermissionEntities());
        } else {
            console.log("permissionEntities already available");
        }
    }, [dispatch, permissionEntities]);

    useEffect(() => {
        fetchPermissionEntities();
    }, [fetchPermissionEntities]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setPermissionEntities(data);
            setLoading(false);
            dispatch(roleActions.clearGetAllPermissionEntitiesStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch entities.",
            });
            dispatch(roleActions.clearGetAllPermissionEntitiesStatus());
            dispatch(roleActions.clearGetAllPermissionEntitiesError());
        }
    }, [
        status,
        error,
        data,
        dispatch,
    ]);

    return { loading, permissionEntities };
}
