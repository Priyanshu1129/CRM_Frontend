"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { UpdateTenderForm } from "../../components/update-tender-form";
import { getTender } from "@/redux/actions/tenderAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const TenderDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector(
    (state) => state.tender.getTender
  );
  const { id } = useParams();

  const [tender, setTender] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchTenderDetails = useCallback(() => {
    if ((!tender && id) || id !== String(tender?._id)) {
      dispatch(getTender(id));
    }
  }, [dispatch, id, tender]);

  useEffect(() => {
    fetchTenderDetails();
  }, [fetchTenderDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setTender(data?.data);
      setLoading(false);
      dispatch(tenderActions.clearGetTenderStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch tender.",
      });
      dispatch(tenderActions.clearGetTenderStatus());
      dispatch(tenderActions.clearGetTenderError());
    }
  }, [status, error, data?.data, dispatch]);

  return (
    <>
      <FormHeader backButtonText="Back to Tenders" />
      <Space
        direction="vertical"
        style={{
          marginTop: "28px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
        }}
      >
        {loading ? (
          <FullScreenLoading />
        ) : (
          <UpdateTenderForm tender={tender} />
        )}
      </Space>
    </>
  );
};
export default TenderDetails;
