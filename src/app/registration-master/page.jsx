"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "@/components";
import { RegistrationsTableView, RegistrationsCardView } from "./components";
import { notification } from "antd";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { getAllRegistrations } from "@/redux/actions/registrationAction";

const RegistrationMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.registration.getAllRegistrations
  );
  const [registrations, setRegistrations] = useState(data?.registrations);

  const fetchAllRegistrations = useCallback(() => {
    if (
      !registrations ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh
    ) {
      dispatch(getAllRegistrations({ page: currentPage, limit: pageSize }));
    }
  }, [
    dispatch,
    registrations,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
  ]);

  useEffect(() => {
    fetchAllRegistrations();
  }, [fetchAllRegistrations]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setRegistrations(data?.registrations);
      setLoading(false);
      setRefresh(false);
      dispatch(registrationActions.clearGetAllRegistrationsStatus());
    } else if (status == "failed") {
      setLoading(false);
      setRefresh(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch registrations.",
      });
      dispatch(registrationActions.clearGetAllRegistrationsStatus());
      dispatch(registrationActions.clearGetAllRegistrationsError());
    }
  }, [dispatch, status, data?.registrations, error]);
  return (
    <>
      <ListHeader
        toPath={"/registration-master/add-registration"}
        buttonText={"Add new registration"}
        setRefresh={setRefresh}
      />
      {view == "table" ? (
        <RegistrationsTableView
          data={registrations}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          total={data?.totalCount}
        />
      ) : (
        <RegistrationsCardView />
      )}
    </>
  );
};

export default RegistrationMaster;
