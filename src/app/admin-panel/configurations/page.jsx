"use client";
import React from "react";
import { Table, BackButton } from "@/components";
import { getColumns, configResources } from "./configResource";
import { useGetConfigCount } from "@/hooks";

const Configurations = () => {
  const { counts, loading } = useGetConfigCount();
  const columns = getColumns({ counts });

  return (
    <>
      <BackButton />
      <Table
        loading={loading}
        data={configResources}
        columns={columns}
        ScrollX="0"
      />
    </>
  );
};

export default Configurations;
