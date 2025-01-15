"use client";

import ClientCard from "@/app/client/delete-client/[id]/component/ClientCard";
import RegistrationCard from "@/app/client/delete-client/[id]/component/RegistrationCard";
import { useDeleteRegistration } from "@/hooks/registration/useDeleteRegistration";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Typography, Divider, Row, Col } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const { Title, Text } = Typography;

const DeleteRegistrationPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteRegistration } = useDeleteRegistration();

  // Fetch registration details when the page is loaded
  useEffect(() => {
    handleDeleteRegistration(id);
  }, [id]);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
        <Col>
          <Title level={3}>Delete Registration</Title>
          <Text style={{ color: "#888" }}>
            Please review the registration and related client details carefully before confirming the deletion.
          </Text>
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            type="default"
            onClick={() => handleDeleteRegistration(id)}
            loading={loading}
          >
            Reload
          </Button>
        </Col>
      </Row>

      <Divider />

      {/* Registration Details Section */}
      <section style={{ marginBottom: "24px" }}>
        <Title level={4}>Registration Details</Title>
        <Text style={{ color: "#888" }}>
          Below are the details of the registration. Please verify all fields before proceeding with deletion.
        </Text>
        <div style={{ marginTop: "16px" }}>
          {data?.data?.registration && <RegistrationCard registration={data?.data?.registration} />}
        </div>
      </section>

      <Divider />

      {/* Associated Client Details Section */}
      {data?.data?.registration?.client && (
        <section>
          <Title level={4}>Associated Client</Title>
          <Text style={{ color: "#888" }}>
            (Client will not be affected on deleting tender) The registration is associated with the following client. Review the client details below.
          </Text>
          <div style={{ marginTop: "16px" }}>
            <ClientCard client={data?.data?.registration?.client} />
          </div>
        </section>
      )}

      <Divider />

      {/* Confirmation or Delete Button Section */}
      <Row justify="center" style={{ marginTop: "24px" }}>
        <Col>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => handleDeleteRegistration(id, "true")}
            loading={loading}
          >
            Confirm Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteRegistrationPage;
