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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.tender.getAllTenders
  );
  const [tenders, setTenders] = useState(data?.tenders);

  const fetchAllTenders = useCallback(() => {
    if (
      !tenders ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit)
    ) {
      dispatch(getAllTenders({ page: currentPage, limit: pageSize }));
    }
  }, [dispatch, tenders, currentPage, pageSize, data?.page, data?.limit]);

  useEffect(() => {
    fetchAllTenders();
  }, [fetchAllTenders]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setTenders(data?.tenders);
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
  }, [dispatch, status, data?.tenders, error]);
  return (
    <>
      <ListHeader
        toPath={"/tender-master/add-tender"}
        buttonText={"Add new tender"}
      />
      {view == "table" ? (
        <TendersTableView
          data={tenders}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          total={data?.totalCount}
        />
      ) : (
        <TendersCardView />
      )}
    </>
  );
};

export default TenderMaster;
