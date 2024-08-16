"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { TendersTableView, TendersCardView } from "./components";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader
        toPath={"tender-master/add-tender"}
        buttonText={"Add new tender"}
      />
      {view == "table" ? <TendersTableView /> : <TendersCardView />}
    </>
  );
};

export default List;
