import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { createIndustry, createSalesSubStage, createSolution, createTerritory, getAllIndustries, getAllSalesSubStages, getAllSolutions, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, salesSubStageActions, solutionActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";
export const useCreateSalesSubStage = ({setShowCreateConfigPopup}) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.salesSubStage.createSalesSubStage);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Sales Sub Stage Created successfully.",
            });
            dispatch(getAllSalesSubStages());
            dispatch(salesSubStageActions.clearCreateSalesSubStageStatus());
            setShowCreateConfigPopup(false);
            getAllSalesSubStages();
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to create Solution",
            });
            dispatch(salesSubStageActions.clearCreateSalesSubStageStatus());
            dispatch(salesSubStageActions.clearCreateSalesSubStageError());
            setShowCreateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        // console.log("Territory int create solution : ", solution);
        console.log("values in onFinish of createSalesSubStage ", values)
        setLoading(true);
        dispatch(createSalesSubStage(values));
    };

    return { loading, onFinish };
}