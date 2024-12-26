"use client";
import { useFetchLeaderboard } from "@/hooks/dashboards";
import { LeaderboardHeader, TableView, ChartView } from "./components";
import React, { useState } from "react";
import { data } from "./data";

const Leaderboard = () => {
  const [view, setView] = useState("chartView");
  // const { loading, leaderboardData, setRefresh } = useFetchLeaderboard();
  // console.log(loading, leaderboardData);
  return (
    <>
      <LeaderboardHeader view={view} setView={setView} />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        {view == "tableView" && <TableView data={data} />}
        {view == "chartView" && <ChartView data={data} />}
      </div>
    </>
  );
};

export default Leaderboard;
