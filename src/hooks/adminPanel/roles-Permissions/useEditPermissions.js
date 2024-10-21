import { editRolePermissions } from "@/redux/actions/roleAndPermissionAction";
import { useDispatch } from "react-redux";

export const useEditPermissions = ({ checkedActions }) => {
    const dispatch = useDispatch();

    const handleUpdate = () => {

        const filterPermissions = (permissions) => {
            return permissions.filter(
                (permission) => permission.allowedActions.length > 0
            );
        };
        const filteredPermissions = filterPermissions(checkedActions);

        dispatch(
            editRolePermissions({ permissionUpdates: filteredPermissions }, role._id)
        );
    };

    return { handleUpdate }
}