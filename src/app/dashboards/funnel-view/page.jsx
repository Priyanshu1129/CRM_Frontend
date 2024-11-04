"use client";
import React, { useState, useEffect } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchFunnelView } from "@/hooks/dashboards";
import { Text } from "@/components";
// import { PageSkeleton } from "./components/skeleton";
// import { KanbanBoard } from "./components/board";
// import { KanbanColumn } from "./components/column";
// import { DealKanbanCardMemo } from "./components/deal-kanban-card";
// import { KanbanItem } from "./components/item";
// import { stages, getStats } from "./stages";
// import ShowCurrency from "../components/ShowCurrency";
import moment from "moment";
import { useRouter } from "next/navigation";

const PipeView = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState("10-01-01");
  const { loading, setRefresh, funnelViewData, filters, setFilter, setFilters } =
    useFetchFunnelView({
      startDate, endDate
    });
 
  const router = useRouter();

  // useEffect(() => {
  //   if (opportunities) {
  //     setStats(getStats(opportunities));
  //   }
  // }, [opportunities]);

  return (
    <>
      Funnel --------------------------
      {/* {
        funnelViewData
      } */}
    </>
  );
};

export default PipeView;
