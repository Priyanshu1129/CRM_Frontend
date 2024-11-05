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
import FunnelChart from "./components/funnelChart";

const PipeView = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState("10-01-01");
  const { loading, setRefresh, funnelViewData, filters, setFilter, setFilters } =
    useFetchFunnelView({
      startDate, endDate
    });
  console.log("funnel data-------------",funnelViewData)
  const router = useRouter();

  // useEffect(() => {
  //   if (opportunities) {
  //     setStats(getStats(opportunities));
  //   }
  // }, [opportunities]);

  return (
    <>
      Funnel --------------------------
       <FunnelChart funnelStats={{
            "lead": 5,
            "prospect": 10,
            "qualification": 1,
            "proposal": 1,
            "followup": 5,
            "closing": 2
        }}></FunnelChart>
    </>
  );
};

export default PipeView;
