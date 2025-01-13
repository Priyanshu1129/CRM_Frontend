import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { createOpportunity } from "@/redux/actions/opportunityAction";
import { notification } from "antd";
import { convertToUSD } from "@/utilities/convertCurrency";
import { convertCurrency } from "@/utilities/convertCurrency";

export const useAddOpportunity = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.currency.viewCurrency);

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
    const salesTopLineInUSD = convertCurrency({
      value: values?.salesTopLine,
      selectedCurrency: currency?.value,
      toUSD: true,
    });
    const offsetsInUSD = convertCurrency({
      value: values?.offsets,
      selectedCurrency: currency?.value,
      toUSD: true,
    });
    if (values.revenue) {
      values.revenue = convertToUSD(values.revenue, currency?.value);
    }
    let newValues = {
      ...values,
      salesTopLine: salesTopLineInUSD,
      offsets: offsetsInUSD,
      // entryDate: new Date().toISOString(),
    };
    console.log(newValues);
    // dispatch(createOpportunity(newValues));
  };

  return { loading, onFinish };
};
