import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { getAllIndustries, getAllSolutions, updateIndustry, updateSolution, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, solutionActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useUpdateSolution= ({updateConfigData  , setShowUpdateConfigPopup}) => {
    const solution = updateConfigData
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.solution.updateSolution);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Solution updated successfully.",
            });
            dispatch(getAllSolutions());
            dispatch(solutionActions.clearUpdateSolutionStatus());
            setShowUpdateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update Solution",
            });
            dispatch(solutionActions.clearUpdateSolutionStatus());
            dispatch(solutionActions.clearUpdateSolutionError());
            setShowUpdateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        console.log("Territory int update : ", solution);
        setLoading(true);
        if(solution.label != values.label)
            dispatch(updateSolution(values,solution._id));
    };

    return { loading, onFinish };
}