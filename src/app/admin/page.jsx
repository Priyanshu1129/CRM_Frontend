"use client";
import React, { useState, useEffect } from "react";
import { List } from "antd";
import { AdminPanelCard } from "./components";
import { resources } from "./resource";
import { getAuthorizedResources } from "@/utilities/checkPermission";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const [authorizedResources, setAuthorizedResources] = useState([]);
  const { data, permissions } = useSelector((state) => state.auth.authDetails);

  useEffect(() => {
    try {
      if (data?.role?.name === "SUPER ADMIN") {
        setAuthorizedResources(resources);
      } else {
        const authorized = getAuthorizedResources(resources, permissions || []);
        setAuthorizedResources(authorized);
      }
    } catch (error) {
      console.error("Error while filtering authorized resources:", error);
      setAuthorizedResources([]); // Fallback to empty array
    }
  }, [permissions, data]);

  console.log("authorizedResources", authorizedResources);

  return (
    <>
      <List
        grid={{
          gutter: 24,
          // column: 4,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={authorizedResources}
        renderItem={(resource) => (
          <List.Item style={{ marginBottom: "24px" }}>
            <AdminPanelCard resource={resource} />
          </List.Item>
        )}
      />
    </>
  );
};

export default AdminPanel;
