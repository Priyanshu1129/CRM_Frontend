import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { createOpportunity } from "@/redux/actions/opportunityAction";
import { notification } from "antd";
import { convertToUSD } from "@/utilities/convertCurrency";

export const useAddOpportunity = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(1);
  const { status, error } = useSelector(
    (state) => state.opportunity.createOpportunity
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Opportunity added successfully.",
      });
      dispatch(opportunityActions.clearCreateOpportunityStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add opportunity.",
      });
      dispatch(opportunityActions.clearCreateOpportunityStatus());
      dispatch(opportunityActions.clearCreateOpportunityError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    const salesTopLineInUSD = parseFloat(
      values?.salesTopLine / currency
    ).toFixed(2);
    const offsetsInUSD = parseFloat(values?.offsets / currency).toFixed(2);
    if (values.revenue) {
      values.revenue = convertToUSD(values.revenue, currency);
    }
    let newValues = {
      ...values,
      salesTopLine: salesTopLineInUSD,
      offsets: offsetsInUSD,
      // entryDate: new Date().toISOString(),
    };
    dispatch(createOpportunity(newValues));
  };

  return { loading, onFinish, currency, setCurrency };
};
