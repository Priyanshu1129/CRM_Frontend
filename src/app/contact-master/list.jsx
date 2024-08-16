"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { ContactsTableView, ContactsCardView } from "./components";

const List = () => {
  const [view, setView] = useState("table");
  return (
    <>
      <ListHeader toPath={"contact-master/add-contact"} buttonText={"Add new contact"} />
      {view == "table" ? <ContactsTableView /> : <ContactsCardView />}
    </>
  );
};

export default List;
