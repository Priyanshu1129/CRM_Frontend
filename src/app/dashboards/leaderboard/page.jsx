"use client";
import { useFetchLeaderboard } from "@/hooks/dashboards";
import { DashboardHeader } from "../components";
import { Board } from "./components/leaderboard";
import React from "react";

const data = [
  {
    _id: "670e85355a74d28e495aaf4e",
    firstName: "Ashwin",
    lastName: "Gorle",
    entryDetails: {
      currentQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      lastQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 1,
        prospectEntries: 5,
        qualificationEntries: 10,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      last3rdQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 11,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 25,
        wonEntries: 2,
      },
      last4thQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      lastYear: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
    },
  },
  {
    _id: "670e85355a74d28e495aaf4e",
    firstName: "Priyanshu",
    lastName: "Jaj",
    entryDetails: {
      currentQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      lastQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 1,
        prospectEntries: 5,
        qualificationEntries: 10,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      last3rdQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 11,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 25,
        wonEntries: 2,
      },
      last4thQuarter: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
      lastYear: {
        clientEntries: 9,
        contactEntries: 2,
        registrationEntries: 0,
        tenderEntries: 0,
        mentionEntries: 6,
        leadEntries: 8,
        prospectEntries: 5,
        qualificationEntries: 50,
        followUpEntries: 2,
        proposalEntries: 12,
        closingEntries: 6,
        wonEntries: 2,
      },
    },
  },
];

const Leaderboard = () => {
  // const { loading, leaderboardData, setRefresh } = useFetchLeaderboard();
  // console.log(loading, leaderboardData);
  return (
    <>
      <div
        style={{
          height: "100%",
          background: "green",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Board data={data} />
      </div>
    </>
  );
};

export default Leaderboard;
