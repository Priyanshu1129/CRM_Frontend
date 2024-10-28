"use client";
import React from "react";
import { Table, BackButton} from "@/components";
import { getColumns, configResources } from "./configResource";

const Configurations = () => {
  const columns = getColumns();




  return (
    <>
      <BackButton />
      <Table
        loading={false}
        data={configResources}
        columns={columns}
        ScrollX="0"
      />
    </>
  );
};

export default Configurations;
