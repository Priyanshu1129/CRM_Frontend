import React from "react";
import { ListTitleButton } from "./list-title-button";
import { ListSearch } from "./list-search";

export const ListHeader = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ListTitleButton toPath="contacts" buttonText="Add new contact" />
      <ListSearch />
    </div>
  );
};
