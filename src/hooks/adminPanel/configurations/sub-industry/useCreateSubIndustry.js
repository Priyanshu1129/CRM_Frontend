import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { createIndustry, createSubIndustry, createTerritory, getAllSubIndustries, updateTerritory } from "@/redux/actions/configurationAction";
import { subIndustryActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useCreateSubIndustry = ({territory, setShowCreateConfigPopup}) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.subIndustry.createSubIndustry);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Sub Industry Created successfully.",
            });
            dispatch(getAllSubIndustries());
            dispatch(subIndustryActions.clearCreateSubIndustryStatus());
            setShowCreateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to create Sub Industry",
            });
            dispatch(subIndustryActions.clearCreateSubIndustryStatus());
            dispatch(subIndustryActions.clearCreateSubIndustryError());
            setShowCreateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        // console.log("Sub Industry int create territory : ", territory);
        console.log("values in onFinish of createTerritory ", values)
        setLoading(true);
        dispatch(createSubIndustry(values));
    };

    return { loading, onFinish };
}