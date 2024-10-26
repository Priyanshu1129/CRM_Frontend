import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { createIndustry, createSolution, createTerritory, getAllIndustries, getAllSolutions, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, solutionActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";
export const useCreateSolution = ({setShowCreateConfigPopup}) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.solution.createSolution);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Solution Created successfully.",
            });
            dispatch(getAllSolutions());
            dispatch(solutionActions.clearCreateSolutionStatus());
            setShowCreateConfigPopup(false);
            getAllSolutions();
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to create Solution",
            });
            dispatch(solutionActions.clearCreateSolutionStatus());
            dispatch(solutionActions.clearCreateSolutionError());
            setShowCreateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        // console.log("Territory int create solution : ", solution);
        console.log("values in onFinish of createSolution ", values)
        setLoading(true);
        dispatch(createSolution(values));
    };

    return { loading, onFinish };
}