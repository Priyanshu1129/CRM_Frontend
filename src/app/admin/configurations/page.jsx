"use client";
import React from "react";
import { Table, BackButton } from "@/components";
import { getColumns, configResources } from "./configResource";
import { useGetConfigCount } from "@/hooks";

const Configurations = () => {
  const { counts, loading } = useGetConfigCount();
  const columns = getColumns({ counts });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <BackButton />
      <div
        style={{
          flex: "1", // Takes remaining space below header
          overflow: "hidden", // Prevent overflow
          borderRadius: "8px",
        }}
      >
        <Table
          loading={loading}
          data={configResources}
          columns={columns}
          ScrollX="0"
        />
      </div>
    </div>
  );
};

export default Configurations;
