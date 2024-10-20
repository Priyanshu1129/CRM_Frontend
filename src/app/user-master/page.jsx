"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { UsersTableView } from "./components";
import { useFetchUsers } from "@/hooks/user";

const UserMaster = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [refresh, setRefresh] = useState(false);

  const { users, loading, totalCount } = useFetchUsers(
    currentPage,
    pageSize,
    refresh,
    setRefresh
  );

  return (
    <>
      <ListHeader
        toPath={"/user-master/add-user"}
        buttonText={"Add new user"}
        pageName={"user"}
        setRefresh={setRefresh}
      />
      <UsersTableView
        data={users}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        total={totalCount}
      />
    </>
  );
};

export default UserMaster;
