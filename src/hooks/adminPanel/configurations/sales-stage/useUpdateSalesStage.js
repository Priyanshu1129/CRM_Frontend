import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { getAllIndustries, getAllSalesStages, getAllSolutions, updateIndustry, updateSalesStage, updateSolution, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, salesStageActions, solutionActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useUpdateSalesStage= ({updateConfigData  , setShowUpdateConfigPopup}) => {
    const salesStage = updateConfigData
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.salesStage.updateSalesStage);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Sales Stage updated successfully.",
            });
            dispatch(getAllSalesStages());
            dispatch(salesStageActions.clearUpdateSalesStageStatus());
            setShowUpdateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update Sales Stage",
            });
            dispatch(salesStageActions.clearUpdateSalesStageStatus());
            dispatch(salesStageActions.clearUpdateSalesStageError());
            setShowUpdateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        console.log("salesStage in update : ", salesStage);
        setLoading(true);
        if(salesStage.label != values.label)
            dispatch(updateSalesStage(values,salesStage._id));
    };

    return { loading, onFinish };
}