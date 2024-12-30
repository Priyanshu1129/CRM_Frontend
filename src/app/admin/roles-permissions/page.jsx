"use client";
import React from "react";
import { ListHeader } from "@/components";
import { RolesTableView } from "./components";
import { useFetchAllRoles } from "@/hooks/adminPanel/roles-Permissions";

const RolesAndPermissions = () => {
  const { loading, roles, setRefresh } = useFetchAllRoles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <ListHeader
        toPath={"/admin-panel/roles-permissions/add-role"}
        buttonText={"Add new role"}
        pageName={"role"}
        setRefresh={setRefresh}
        backButton={true}
        backButtonText={true}
      />
      <div
        style={{
          flex: "1", // Takes remaining space below header
          overflow: "hidden", // Prevent overflow
          borderRadius: "8px",
        }}
      >
        <RolesTableView data={roles} loading={loading} />
      </div>
    </div>
  );
};

export default RolesAndPermissions;
