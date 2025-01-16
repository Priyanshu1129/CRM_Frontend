import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertRevenue, convertCurrency } from "@/utilities/convertCurrency";
import {
  updateOpportunity,
  getAllOpportunities,
} from "@/redux/actions/opportunityAction";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { notification } from "antd";
import { getChangedValues } from "@/utilities/getChangedValues";
import dayjs from "dayjs";
import { salesSubStageActions } from "@/redux/slices/configurationSlice";

export const useUpdateOpportunity = ({ opportunity, form }) => {
  const [loading, setLoading] = useState(false);
  const { currency } = useSelector((state) => state.currency.viewCurrency);

  const dispatch = useDispatch();
  const { status, error } = useSelector(
    (state) => state.opportunity.updateOpportunity
  );
  const initialValues = useRef({});

  useEffect(() => {
    if (opportunity) {
      const opportunityInitialValues = {
        client: opportunity.client?._id,
        customId: opportunity.customId,
        partneredWith: opportunity.partneredWith,
        projectName: opportunity.projectName,
        associatedTender: opportunity.associatedTender?._id,
        solution: opportunity.solution?._id,
        subSolution: opportunity.subSolution?._id,
        salesChamp: opportunity.salesChamp?._id,
        salesStage: opportunity.salesStage?._id,
        salesSubStage: opportunity.salesSubStage?._id,
        stageClarification: opportunity.stageClarification,
        salesTopLine: convertCurrency({
          value: opportunity.salesTopLine,
          selectedCurrency: currency?.value,
        }),
        offsets: convertCurrency({
          value: opportunity.offsets,
          selectedCurrency: currency?.value,
        }),
        revenue: convertRevenue({
          revenue: opportunity?.revenue,
          selectedCurrency: currency?.value,
          toUSD: false,
        }),
        expectedWonDate: opportunity.expectedWonDate
          ? dayjs(opportunity.expectedWonDate)
          : null,
        closingDate: opportunity.closingDate
          ? dayjs(opportunity.closingDate)
          : null,
      };
      form.setFieldsValue(opportunityInitialValues);
      // align the sales sub stage with sales stage
      dispatch(
        salesSubStageActions.filterSalesSubStages(
          opportunityInitialValues.salesStage?._id?.toString()
        )
      );
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
        changedValues.offsets = convertCurrency({
          value: values?.offsets,
          selectedCurrency: currency?.value,
          toUSD: true,
        });
      }
      if (changedValues.salesTopLine) {
        changedValues.salesTopLine = convertCurrency({
          value: values?.salesTopLine,
          selectedCurrency: currency?.value,
          toUSD: true,
        });
      }
      if (changedValues.revenue) {
        changedValues.revenue = convertRevenue({
          revenue: values.revenue,
          selectedCurrency: currency?.value,
          toUSD: true,
        });
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

  return { loading, onFinish };
};
