"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "@/components";
import { TendersTableView, TendersCardView } from "./components";
import { notification } from "antd";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { getAllTenders } from "@/redux/actions/tenderAction";

const TenderMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.tender.getAllTenders
  );
  const [tenders, setTenders] = useState(data?.data);

  const fetchAllTenders = useCallback(() => {
    if (!tenders) {
      // dispatch(getAllTenders());
    }
  }, [dispatch, tenders]);

  useEffect(() => {
    fetchAllTenders();
  }, [fetchAllTenders]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setTenders(data?.data);
      setLoading(false);
      dispatch(tenderActions.clearGetAllTendersStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch tenders.",
      });
      dispatch(tenderActions.clearGetAllTendersStatus());
      dispatch(tenderActions.clearGetAllTendersError());
    }
  }, [dispatch, status]);
  return (
    <>
      <ListHeader
        toPath={"/tender-master/add-tender"}
        buttonText={"Add new tender"}
      />
      {view == "table" ? (
        <TendersTableView data={tenders} loading={loading} />
      ) : (
        <TendersCardView />
      )}
    </>
  );
};

export default TenderMaster;
