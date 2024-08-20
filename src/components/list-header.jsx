import React from "react";
import { ListTitleButton } from "./list-title-button";
import { ListSearch } from "./list-search";

export const ListHeader = ({ toPath, buttonText, SearchType }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ListTitleButton toPath={toPath} buttonText={buttonText} />
      <ListSearch SearchType={SearchType} />
    </div>
  );
};
