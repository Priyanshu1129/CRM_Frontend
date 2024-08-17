"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { OpportunitiesTableView, OpportunitiesCardView } from "./components";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader
        toPath={"/opportunity-master/add-opportunity"}
        buttonText={"Add new opportunity"}
      />
      {view == "table" ? <OpportunitiesTableView /> : <OpportunitiesCardView />}
    </>
  );
};

export default List;
