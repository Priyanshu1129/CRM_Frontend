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
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.registration.getAllRegistrations
  );
  const [registrations, setRegistrations] = useState(data?.data);

  const fetchAllRegistrations = useCallback(() => {
    if (!registrations) {
      // dispatch(getAllRegistrations());
    }
  }, [dispatch, registrations]);

  useEffect(() => {
    fetchAllRegistrations();
  }, [fetchAllRegistrations]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setRegistrations(data?.data);
      setLoading(false);
      dispatch(registrationActions.clearGetAllRegistrationsStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch registrations.",
      });
      dispatch(registrationActions.clearGetAllRegistrationsStatus());
      dispatch(registrationActions.clearGetAllRegistrationsError());
    }
  }, [dispatch, status]);
  return (
    <>
      <ListHeader
        toPath={"/registration-master/add-registration"}
        buttonText={"Add new registration"}
      />
      {view == "table" ? (
        <RegistrationsTableView data={registrations} loading={loading} />
      ) : (
        <RegistrationsCardView />
      )}
    </>
  );
};

export default RegistrationMaster;
