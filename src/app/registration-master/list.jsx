"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { RegistrationsTableView, RegistrationsCardView } from "./components";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader
        toPath={"/registration-master/add-registration"}
        buttonText={"Add new registration"}
      />
      {view == "table" ? <RegistrationsTableView /> : <RegistrationsCardView />}
    </>
  );
};

export default List;
