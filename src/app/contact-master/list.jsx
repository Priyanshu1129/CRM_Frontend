"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { ContactsTableView, ContactsCardView } from "./components";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader />
      {view == "table" ? <ContactsTableView /> : <ContactsCardView />}
    </>
  );
};

export default List;
