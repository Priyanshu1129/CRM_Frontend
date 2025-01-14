"use client";
import { useFetchLeaderboard } from "@/hooks/dashboards";
import { LeaderboardHeader, TableView, ChartView } from "./components";
import React, { useState } from "react";
import { data } from "./config";

const Leaderboard = () => {
  const [view, setView] = useState("chartView");
  const [type, setType] = useState("left");
  const [selectedQuarter, setSelectedQuarter] = useState("currentQuarter");
  const [sortParameter, setSortParameter] = useState("clientEntries"); // Default sort parameter
  // const { loading, leaderboardData, setRefresh } = useFetchLeaderboard();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <LeaderboardHeader
        setSortParameter={setSortParameter}
        sortParameter={sortParameter}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
        view={view}
        type={type}
        setView={setView}
      />
      <div
        style={{
          flex: "1", // Takes remaining space below header
          overflow: "hidden", // Prevent overflow
          borderRadius: "8px",
        }}
      >
        {view == "chartView" && (
          <ChartView
            data={data}
            selectedQuarter={selectedQuarter}
            sortParameter={sortParameter}
            type={type}
            setType={setType}
          />
        )}
        {view == "tableView" && <TableView data={data} />}
      </div>
    </div>
  );
};

export default Leaderboard;
