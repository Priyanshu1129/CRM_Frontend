import { notification } from "antd";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRole, getAllRoles, getRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { getChangedValues } from "@/utilities/getChangedValues";

export const useUpdateRole = ({ role, form }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, error } = useSelector((state) => state.role.updateRole);

    const initialValues = useRef({});

    useEffect(() => {
        if (role) {
            const roleInitialValues = {
                roleName: role.name,
            };
            form.setFieldsValue(roleInitialValues);
            initialValues.current = roleInitialValues;
        }
    }, [role, form]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Role name updated successfully.",
            });
            dispatch(getRole(role._id));
            dispatch(roleActions.clearUpdateRoleStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update role name.",
            });
            dispatch(roleActions.clearUpdateRoleStatus());
            dispatch(roleActions.clearUpdateRoleError());
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        setLoading(true);

        const changedValues = getChangedValues(initialValues, values);

        console.log("Changed values:", changedValues);

        // Dispatch only if there are changed values
        if (Object.keys(changedValues).length > 0) {
            dispatch(updateRole(changedValues, role._id));
        } else {
            setLoading(false);
            notification.info({
                message: "No Changes",
                description: "No changes were made.",
            });
        }
    };

    return { loading, onFinish };

}