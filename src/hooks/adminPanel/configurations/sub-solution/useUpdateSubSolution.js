import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { getAllIndustries, getAllSolutions, updateIndustry, updateSolution, updateSubSolution, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, solutionActions, subSolutionActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useUpdateSubSolution= ({updateConfigData  , setShowUpdateConfigPopup}) => {
    const subSolution = updateConfigData
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.subSolution.updateSubSolution);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Sub Solution updated successfully.",
            });
            dispatch(getAllSolutions());
            dispatch(subSolutionActions.clearUpdateSubSolutionStatus());
            setShowUpdateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update Sub Solution",
            });
            dispatch(subSolutionActions.clearUpdateSubSolutionStatus());
            dispatch(subSolutionActions.clearUpdateSubSolutionError());
            setShowUpdateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        console.log("subSolution in update : ", subSolution);
        console.log("values in updateSubSolution : ", values);
        setLoading(true);
        if(subSolution.label != values.label)
            dispatch(updateSubSolution(values,subSolution._id));
    };

    return { loading, onFinish };
}