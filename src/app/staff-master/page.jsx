"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "@/components";
import { StaffsTableView, StaffsCardView } from "./components";
import { notification } from "antd";
import { staffActions } from "@/redux/slices/staffSlice";
import { getAllStaffs } from "@/redux/actions/staffAction";

const StaffMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.staff.getAllStaffs
  );
  const [staffs, setStaffs] = useState(data?.data);

  const fetchAllStaffs = useCallback(() => {
    if (!staffs) {
      dispatch(getAllStaffs());
    }
  }, [dispatch, staffs]);

  useEffect(() => {
    fetchAllStaffs();
  }, [fetchAllStaffs]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setStaffs(data?.staffs);
      setLoading(false);
      dispatch(staffActions.clearGetAllStaffsStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch staffs.",
      });
      dispatch(staffActions.clearGetAllStaffsStatus());
      dispatch(staffActions.clearGetAllStaffsError());
    }
  }, [dispatch, status]);
  return (
    <>
      <ListHeader
        toPath={"/staff-master/add-staff"}
        buttonText={"Add new staff"}
      />
      {view == "table" ? (
        <StaffsTableView data={staffs} loading={loading} />
      ) : (
        <StaffsCardView />
      )}
    </>
  );
};

export default StaffMaster;
