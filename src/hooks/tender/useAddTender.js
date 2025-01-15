import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { createTender } from "@/redux/actions/tenderAction";
import { notification } from "antd";
import { convertCurrency } from "@/utilities/convertCurrency";

export const useAddTender = () => {
  const [loading, setLoading] = useState(false);
  const { currency } = useSelector((state) => state.currency.viewCurrency);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.tender.createTender);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Tender added successfully.",
      });
      dispatch(tenderActions.clearCreateTenderStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add tender.",
      });
      dispatch(tenderActions.clearCreateTenderStatus());
      dispatch(tenderActions.clearCreateTenderError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    const bondValueInUSD = convertCurrency({
      value: values?.bondValue,
      selectedCurrency: currency?.value,
      toUSD: true,
    });
    const formattedValues = {
      ...values,
      bondValue: bondValueInUSD,
      rfpDate: values?.rfpDate.format("YYYY-MM-DD"),
      submissionDueDate: values?.submissionDueDate?.format("YYYY-MM-DD"),
      submissionDate: values?.submissionDate?.format("YYYY-MM-DD"),
      evaluationDate: values?.evaluationDate?.format("YYYY-MM-DD"),
      bondIssueDate: values?.bondIssueDate?.format("YYYY-MM-DD"),
      bondExpiry: values?.bondExpiry?.format("YYYY-MM-DD"),
      entryDate: new Date().toISOString(),
    };
    dispatch(createTender(formattedValues));
  };

  return { loading, onFinish };
};
