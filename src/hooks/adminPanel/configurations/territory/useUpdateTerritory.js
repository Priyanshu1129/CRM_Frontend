import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { updateTerritory } from "@/redux/actions/configurationAction";
import { territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useUpdateTerritory = ({ updateConfigData, setShowUpdateConfigPopup }) => {
    const territory = updateConfigData
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.territory.updateTerritory);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Territory updated successfully.",
            });
            dispatch(getAllTerritories());
            dispatch(territoryActions.clearUpdateTerritoryStatus());
            setShowUpdateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update Territory",
            });
            dispatch(territoryActions.clearUpdateTerritoryStatus());
            dispatch(territoryActions.clearUpdateTerritoryError());
            setShowUpdateConfigPopup(false);
        }
    }, [status, error, dispatch, setShowUpdateConfigPopup]);

    const onFinish = (values) => {
        console.log("territory int update : ------------------------------ ", values);
        setLoading(true);
        if (territory.label != values.label)
            dispatch(updateTerritory(values, territory._id));
    };

    return { loading, onFinish };
}