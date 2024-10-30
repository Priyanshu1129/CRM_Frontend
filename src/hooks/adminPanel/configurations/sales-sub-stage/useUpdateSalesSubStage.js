import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { getAllIndustries, getAllSalesSubStages, getAllSolutions, updateIndustry, updateSalesSubStage, updateSolution, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, salesSubStageActions, solutionActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useUpdateSalesSubStage= ({updateConfigData  , setShowUpdateConfigPopup}) => {
    const salesSubStage = updateConfigData
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.salesSubStage.updateSalesSubStage);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Sales Sub Stage updated successfully.",
            });
            dispatch(getAllSalesSubStages());
            dispatch(salesSubStageActions.clearUpdateSalesSubStageStatus());
            setShowUpdateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update Sales Sub Stage",
            });
            dispatch(salesSubStageActions.clearUpdateSalesSubStageStatus());
            dispatch(salesSubStageActions.clearUpdateSalesSubStageError());
            setShowUpdateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        console.log("salesSubStage in update : ", salesSubStage);
        // if(salesSubStage.label != values.label )
            setLoading(true);
            dispatch(updateSalesSubStage(values,salesSubStage._id));
    };

    return { loading, onFinish };
}