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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.staff.getAllStaffs
  );
  const [staffs, setStaffs] = useState(data?.staffs);

  const fetchAllStaffs = useCallback(() => {
    if (
      !staffs ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit)
    ) {
      dispatch(getAllStaffs({ page: currentPage, limit: pageSize }));
    }
  }, [dispatch, staffs, currentPage, pageSize, data?.page, data?.limit]);

  useEffect(() => {
    fetchAllStaffs();
  }, [fetchAllStaffs]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
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
  }, [dispatch, status, data?.staffs, error]);
  return (
    <>
      <ListHeader
        toPath={"/staff-master/add-staff"}
        buttonText={"Add new staff"}
        SearchType={"staff"}
      />
      {view == "table" ? (
        <StaffsTableView
          data={staffs}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          total={data?.totalCount}
        />
      ) : (
        <StaffsCardView />
      )}
    </>
  );
};

export default StaffMaster;
