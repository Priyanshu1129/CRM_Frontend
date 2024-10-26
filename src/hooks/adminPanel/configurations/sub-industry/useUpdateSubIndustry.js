import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { getAllSubIndustries, updateSubIndustry, updateTerritory } from "@/redux/actions/configurationAction";
import { subIndustryActions, territoryActions } from "@/redux/slices/configurationSlice";
import { getAllTerritories } from "@/redux/actions/configurationAction";

export const useUpdateSubIndustry = ({updateConfigData  , setShowUpdateConfigPopup}) => {
    const subIndustry = updateConfigData
    // console.log("useUpdateSubIndustry updateCOnfigData : ", updateConfigData)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { status, data, error } = useSelector((state) => state.subIndustry.updateSubIndustry);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Sub Industry updated successfully.",
            });
            dispatch(getAllSubIndustries());
            dispatch(subIndustryActions.clearUpdateSubIndustryStatus());
            setShowUpdateConfigPopup(false);
            // dispatch(roleActions.clearCreateRoleData());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update Sub Industry",
            });
            dispatch(subIndustryActions.clearUpdateSubIndustryStatus());
            dispatch(subIndustryActions.clearUpdateSubIndustryError());
            setShowUpdateConfigPopup(false);
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        console.log("subIndustry in update : ", values);
        setLoading(true);
        if(subIndustry.label != values.label)
            dispatch(updateSubIndustry(values,subIndustry._id));
    };

    return { loading, onFinish };
}