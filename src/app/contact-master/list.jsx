"use client";
import React, { useState } from "react";
import { ListHeader, TableView } from "@/components";
import { ClientsCardView } from "./components/cardList";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader />
      {view == "table" ? <TableView /> : <ClientsCardView />}
    </>
  );
};

export default List;
