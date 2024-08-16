"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import {
  BusinessDevelopmentTableView,
  BusinessDevelopmentCardView,
} from "./components";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader
        toPath={"business-development-master/add-business-development"}
        buttonText={"Add New"}
      />
      {view == "table" ? (
        <BusinessDevelopmentTableView />
      ) : (
        <BusinessDevelopmentCardView />
      )}
    </>
  );
};

export default List;
