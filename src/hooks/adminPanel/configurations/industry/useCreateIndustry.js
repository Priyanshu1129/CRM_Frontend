import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { createIndustry, createTerritory, getAllIndustries, updateTerritory } from "@/redux/actions/configurationAction";
import { industryActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useCreateIndustry = ({industry, setShowCreateConfigPopup}) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.industry.createIndustry);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Industry Created successfully.",
            });
            dispatch(getAllIndustries());
            dispatch(industryActions.clearCreateIndustryStatus());
            setShowCreateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to create Industry",
            });
            dispatch(industryActions.clearCreateIndustryStatus());
            dispatch(industryActions.clearCreateIndustryError());
            setShowCreateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        // console.log("Territory int create industry : ", industry);
        console.log("values in onFinish of createTerritory ", values)
        setLoading(true);
        dispatch(createIndustry(values));
    };

    return { loading, onFinish };
}