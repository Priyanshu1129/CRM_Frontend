import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToUSD } from "@/utilities/convertCurrency";
import {
    updateOpportunity,
    getAllOpportunities,
} from "@/redux/actions/opportunityAction";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { notification } from "antd";
import { getChangedValues } from "@/utilities/getChangedValues";
import moment from "moment";

export const useUpdateOpportunity = ({ opportunity, currency, form }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector(
        (state) => state.opportunity.updateOpportunity
    );
    const initialValues = useRef({});

    useEffect(() => {
        if (opportunity) {
            const opportunityInitialValues = {
                client: opportunity.client,
                partneredWith: opportunity.partneredWith,
                projectName: opportunity.projectName,
                associatedTender: opportunity.associatedTender,
                solution: opportunity.solution,
                subSolution: opportunity.subSolution,
                salesChamp: opportunity.salesChamp,
                salesStage: opportunity.salesStage,
                salesSubStage: opportunity.salesSubStage,
                stageClarification: opportunity.stageClarification,
                salesTopLine: opportunity.salesTopLine * currency,
                offsets: opportunity.offsets * currency,
                revenue: opportunity.revenue * currency,
                expectedWonDate : opportunity.expectedWonDate
                ? moment(opportunity.expectedWonDate)
                : null,
            };
            form.setFieldsValue(opportunityInitialValues);
            initialValues.current = opportunityInitialValues;
        }
    }, [opportunity, form, currency]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            notification.success({
                message: "Success",
                description: "Opportunity updated successfully.",
            });
            dispatch(opportunityActions.clearUpdateOpportunityStatus());
            dispatch(getAllOpportunities({}));
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to update opportunity.",
            });
            dispatch(opportunityActions.clearUpdateOpportunityStatus());
            dispatch(opportunityActions.clearUpdateOpportunityError());
        }
    }, [status, error, dispatch]);

    const onFinish = (values) => {
        setLoading(true);

        const changedValues = getChangedValues(initialValues, values);

        const initialRevenue = initialValues.current.revenue || [];
        const updatedRevenue = values.revenue || [];

        // Identify deleted items
        // const deletedRevenue = getDeletedRevenue(initialRevenue, updatedRevenue);
        const deletedRevenue = initialRevenue
            .filter(
                (initialItem) =>
                    !updatedRevenue.some(
                        (updatedItem) => updatedItem._id === initialItem._id
                    )
            )
            .map((item) => ({
                ...item,
                delete: true,
            }));

        // const changedRevenue = getChangedValues(initialRevenue, updatedRevenue);
        const changedRevenue = updatedRevenue.filter((updatedItem) => {
            const initialItem = initialRevenue.find(
                (item) => item._id === updatedItem._id
            );

            return (
                !initialItem ||
                JSON.stringify(updatedItem) !== JSON.stringify(initialItem)
            );
        });

        // Merge the results into changedValues
        if (changedRevenue.length || deletedRevenue.length) {
            changedValues.revenue = [...changedRevenue, ...deletedRevenue];
        }

        // Dispatch only if there are changed values
        if (Object.keys(changedValues).length > 0) {
            if (changedValues.offsets) {
                changedValues.offsets = parseFloat(values?.offsets / currency).toFixed(
                    2
                );
            }
            if (changedValues.salesTopLine) {
                changedValues.salesTopLine = parseFloat(
                    values?.salesTopLine / currency
                ).toFixed(2);
            }
            if (changedValues.revenue) {
                changedValues.revenue = convertToUSD(values.revenue, currency);
            }
            dispatch(updateOpportunity(changedValues, opportunity._id));
        } else {
            setLoading(false);
            notification.info({
                message: "No Changes",
                description: "No changes were made.",
            });
        }
    };


    return { loading, onFinish }
}