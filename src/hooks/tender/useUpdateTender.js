import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { updateTender, getAllTenders } from "@/redux/actions/tenderAction";
import { getChangedValues } from "@/utilities/getChangedValues";
import moment from "moment";
import { notification } from "antd";
import dayjs from "dayjs";

export const useUpdateTender = ({ tender, form, currency }) => {
  const [loading, setLoading] = useState(false);
  const { status, error } = useSelector((state) => state.tender.updateTender);
  const dispatch = useDispatch();
  const initialValues = useRef({});

  useEffect(() => {
    if (tender) {
      const tenderInitialValues = {
        rfpDate: tender.rfpDate ? dayjs(tender.rfpDate) : null,
        submissionDueDate: tender.submissionDueDate
          ? dayjs(tender.submissionDueDate)
          : null,
        submissionDate: tender.submissionDate
          ? dayjs(tender.submissionDate)
          : null,
        evaluationDate: tender.evaluationDate
          ? dayjs(tender.evaluationDate)
          : null,
        bondIssueDate: tender.bondIssueDate
          ? dayjs(tender.bondIssueDate)
          : null,
        bondExpiry: tender.bondExpiry ? dayjs(tender.bondExpiry) : null,
        client: tender.client,
        reference: tender.reference,
        rfpTitle: tender.rfpTitle,
        rfpSource: tender.rfpSource,
        associatedOpportunity: tender.associatedOpportunity,
        bond: tender.bond,
        bondValue: tender.bondValue * currency,
        submissionMode: tender.submissionMode,
        officer: tender.officer,
        bidManager: tender.bidManager,
        stage: tender.stage,
        stageExplanation: tender.stageExplanation,
      };
      form.setFieldsValue(tenderInitialValues);
      initialValues.current = tenderInitialValues;
    }
  }, [tender, form, currency]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Tender updated successfully.",
      });
      dispatch(getAllTenders({}));
      dispatch(tenderActions.clearUpdateTenderStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update tender.",
      });
      dispatch(tenderActions.clearUpdateTenderStatus());
      dispatch(tenderActions.clearUpdateTenderError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    const changedValues = getChangedValues(initialValues, values);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      setLoading(true);
      if (changedValues.bondValue) {
        changedValues.bondValue = parseFloat(
          values?.bondValue / currency
        ).toFixed(2);
      }
      dispatch(updateTender(changedValues, tender._id));
    } else {
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  return { loading, onFinish };
};
