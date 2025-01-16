"use client";

import { useDeleteRole } from "@/hooks/role/useDeleteRole";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Typography, Divider, Row, Col, Alert, theme } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import RoleCard from "./component/RoleCard";
import UserList from "@/app/contact/delete-contact/[id]/component/UserList";
import { BackButton } from "@/components";

const { Title } = Typography;

const DeleteRolePage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteRole } = useDeleteRole();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Fetch role and related data when the page is loaded
  useEffect(() => {
    handleDeleteRole(id);
  }, [id]);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton buttonText={"Back To Roles"} />
        <Button
          icon={<ReloadOutlined />}
          type="default"
          onClick={() => handleDeleteRole(id)}
          loading={loading}
        >
          Reload
        </Button>
      </div>
      <div
        style={{
          marginTop: "24px",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: "24px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* Header Section */}
        {/* <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "24px" }}
        >
          <Col>
            <Title level={3}>Delete Role</Title>
            <Alert
              // message="Attention"
              description="Please review the role and its associated users carefully before confirming the deletion."
              type="warning"
              showIcon
            />
          </Col>
        </Row>
        <Divider /> */}

        {/* Role Details Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{fontSize : '20px', fontWeight : 600}}>Role Details</div>
          <Alert
            // message="Section Description"
            style={{padding : '6px'}}
            description="Below are the details of the role. Please verify the fields before proceeding with the deletion."
            type="info"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.role ? (
              <RoleCard role={data?.role} />
            ) : (
              <Alert
                message="No Role Information Available"
                type="info"
                showIcon
              />
            )}
          </div>
        </section>

        <Divider />

        {/* Users Section */}
        <section style={{ marginBottom: "20px" }}>
          <Title level={4}>Associated Users</Title>
          <Alert
            // message="Section Description"
            style={{padding : '6px'}}
            description="The following users are associated with this role. Deleting the role will revoke their system access unless roles are reassigned."
            type="warning"
            showIcon
          />
          <div style={{ marginTop: "16px" }}>
            {data?.users?.length > 0 ? (
              <UserList users={data?.users} />
            ) : (
              <Alert
                message="No Users Associated with This Role"
                type="info"
                showIcon
              />
            )}
          </div>
        </section>

        <Divider />

        {/* Confirm Deletion Button Section */}
        <Row justify="center" style={{ marginTop: "24px" }}>
          <Col>
            <Button
              type="primary"
              danger
              size="large"
              onClick={() => handleDeleteRole(id, "true")}
              loading={loading}
            >
              Confirm Delete
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DeleteRolePage;
