"use client";
import { useFetchLeaderboard } from "@/hooks/dashboards";
import { LeaderboardHeader, TableView, ChartView } from "./components";
import React, { useState } from "react";
import { data } from "./config";

const Leaderboard = () => {
  const [view, setView] = useState("chartView");
  const [selectedQuarter, setSelectedQuarter] = useState("currentQuarter");
  const [sortParameter, setSortParameter] = useState("clientEntries"); // Default sort parameter
  // const { loading, leaderboardData, setRefresh } = useFetchLeaderboard();
  // console.log(loading, leaderboardData);
  return (
    <>
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
          setView={setView}
        />
        <div
          style={{
            flex: "1", // Takes remaining space below header
            overflow: "hidden", // Prevent overflow
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          {view == "chartView" && (
            <ChartView
              data={data}
              selectedQuarter={selectedQuarter}
              sortParameter={sortParameter}
            />
          )}
          {view == "tableView" && <TableView data={data} />}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
