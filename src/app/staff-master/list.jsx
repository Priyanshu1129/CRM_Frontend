"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { StaffsTableView, StaffsCardView } from "./components";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader toPath={"staff-master/add-staff"} buttonText={"Add new staff"} />
      {view == "table" ? <StaffsTableView /> : <StaffsCardView />}
    </>
  );
};

export default List;
