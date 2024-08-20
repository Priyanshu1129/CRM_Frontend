"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { UpdateRegistrationForm } from "../../components/update-registration-form";
import { getRegistration } from "@/redux/actions/registrationAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const RegistrationDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector(
    (state) => state.registration.getRegistration
  );
  const { id } = useParams();

  const [registration, setRegistration] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchRegistrationDetails = useCallback(() => {
    if ((!registration && id) || id !== String(registration?._id)) {
      dispatch(getRegistration(id));
    }
  }, [dispatch, id, registration]);

  useEffect(() => {
    fetchRegistrationDetails();
  }, [fetchRegistrationDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setRegistration(data?.data);
      setLoading(false);
      dispatch(registrationActions.clearGetRegistrationStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch registration.",
      });
      dispatch(registrationActions.clearGetRegistrationStatus());
      dispatch(registrationActions.clearGetRegistrationError());
    }
  }, [status, error, data?.data, dispatch]);

  return (
    <>
      <FormHeader backButtonText="Back to Registrations" />
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
          <UpdateRegistrationForm registration={registration} />
        )}
      </Space>
    </>
  );
};
export default RegistrationDetails;
