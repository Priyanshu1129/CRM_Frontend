import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { createIndustry, createSolution, createSubSolution, createTerritory, getAllIndustries, getAllSolutions, getAllSubSolutions, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, solutionActions, subSolutionActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useCreateSubSolution = ({setShowCreateConfigPopup}) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.subSolution.createSubSolution);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Sub Solution Created successfully.",
            });
            dispatch(getAllSubSolutions());
            dispatch(subSolutionActions.clearCreateSubSolutionStatus());
            setShowCreateConfigPopup(false);
            getAllSolutions();
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to create Sub  Soution",
            });
            dispatch(subSolutionActions.clearCreateSubSolutionStatus());
            dispatch(subSolutionActions.clearCreateSubSolutionError());
            setShowCreateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        console.log("values in onFinish of createSubSolution ", values)
        setLoading(true);
        dispatch(createSubSolution(values));
    };

    return { loading, onFinish };
}