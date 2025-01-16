"use client";

import BusinessDevelopmentCard from "@/app/client/delete-client/[id]/component/BusinessDevelopmentCard";
import ClientCard from "@/app/client/delete-client/[id]/component/ClientCard";
import { useDeleteBusinessDevelopment } from "@/hooks/tempBd/useDeleteBd";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Typography, Divider, Row, Col } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const { Title, Text } = Typography;

const DeleteMentionPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteBusinessDevelopment } = useDeleteBusinessDevelopment();

  // Fetch registration details when the page is loaded
  useEffect(() => {
    handleDeleteBusinessDevelopment(id);
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
          <Title level={3}>Delete Mention</Title>
          <Text style={{ color: "#888" }}>
            Please review the Mention and related client details carefully before confirming the deletion.
          </Text>
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            type="default"
            onClick={() => handleDeleteBusinessDevelopment(id)}
            loading={loading}
          >
            Reload
          </Button>
        </Col>
      </Row>

      <Divider />

      {/* Registration Details Section */}
      <section style={{ marginBottom: "24px" }}>
        <Title level={4}>Mention Details</Title>
        <Text style={{ color: "#888" }}>
          Below are the details of the mention. Please verify all fields before proceeding with deletion.
        </Text>
        <div style={{ marginTop: "16px" }}>
          {data?.data?.businessDevelopment && <BusinessDevelopmentCard bd={data?.data?.businessDevelopment} />}
        </div>
      </section>

      <Divider />

      {/* Associated Client Details Section */}
      {data?.data?.businessDevelopment?.client && (
        <section>
          <Title level={4}>Associated Client</Title>
          <Text style={{ color: "#888" }}>
            (Client will not be affected on deleting mention) The Mention is associated with the following client. Review the client details below.
          </Text>
          <div style={{ marginTop: "16px" }}>
            <ClientCard client={data?.data?.businessDevelopment?.client} />
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
            onClick={() => handleDeleteBusinessDevelopment(id, "true")}
            loading={loading}
          >
            Confirm Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteMentionPage;
