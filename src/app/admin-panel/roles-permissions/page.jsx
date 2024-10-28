"use client";
import React from "react";
import { ListHeader } from "@/components";
import { RolesTableView } from "./components";
import { useFetchAllRoles } from "@/hooks/adminPanel/roles-Permissions";

const RolesAndPermissions = () => {
  const { loading, roles, setRefresh } = useFetchAllRoles();

  return (
    <div>
      <ListHeader
        toPath={"/admin-panel/roles-permissions/add-role"}
        buttonText={"Add new role"}
        pageName={"role"}
        setRefresh={setRefresh}
        backButton={true}
        backButtonText={false}
      />
      <RolesTableView data={roles} loading={loading} />
    </div>
  );
};

export default RolesAndPermissions;
