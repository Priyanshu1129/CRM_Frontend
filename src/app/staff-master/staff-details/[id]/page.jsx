"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { staffActions } from "@/redux/slices/staffSlice";
import { UpdateStaffForm } from "../../components/update-staff-form";
import { getStaff } from "@/redux/actions/staffAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const StaffDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.staff.getStaff);
  const { id } = useParams();

  const [staff, setStaff] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchStaffDetails = useCallback(() => {
    if ((!staff && id) || id !== String(staff?._id)) {
      dispatch(getStaff(id));
    }
  }, [dispatch, id, staff]);

  useEffect(() => {
    fetchStaffDetails();
  }, [fetchStaffDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setStaff(data?.data);
      setLoading(false);
      dispatch(staffActions.clearGetStaffStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch staff.",
      });
      dispatch(staffActions.clearGetStaffStatus());
      dispatch(staffActions.clearGetStaffError());
    }
  }, [status, error, data?.data, dispatch]);

  return (
    <>
      <FormHeader backButtonText="Back to Staffs" />
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
        {loading ? <FullScreenLoading /> : <UpdateStaffForm staff={staff} />}
      </Space>
    </>
  );
};
export default StaffDetails;
