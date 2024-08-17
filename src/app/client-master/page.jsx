"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { ClientsCardView, ClientsTableView } from "./components";

const ClientMaster = () => {
  const [view, setView] = useState("card");
  return (
    <>
      <ListHeader
        toPath={"/client-master/add-client"}
        buttonText={"Add new client"}
      />
      {view == "table" ? <ClientsTableView /> : <ClientsCardView />}
    </>
  );
};

export default ClientMaster;
