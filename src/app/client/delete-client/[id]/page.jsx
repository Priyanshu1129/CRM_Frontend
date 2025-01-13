"use client";

import React, { useEffect } from "react";
import { Button, Row, Col, Spin, Alert, Card, Typography } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useDeleteClient } from "@/hooks/client/useDeleteClient";

// Import Card Components
import ClientCard from "./component/ClientCard";
import OpportunityCard from "./component/OpportunityCard";
import BusinessDevelopmentCard from "./component/BusinessDevelopmentCard";
import RegistrationCard from "./component/RegistrationCard";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const DeleteClientPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { loading, data, handleDeleteClient } = useDeleteClient();

  // Call handleDeleteClient when the component is mounted or the id changes
  // useEffect(() => {
  //   if (!data || id !== data?.client?._id?.toString()) {
  //     handleDeleteClient(id);
  //   }
  // }, [id, router]);

  // Call handleDeleteClient on route change (including back navigation)
  useEffect(() => {
    handleDeleteClient(id);
  }, []);

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
        <Col>
          <Title level={2}>Delete Client</Title>
          <Text type="secondary" style={{ fontSize: "16px", display: "block" }}>
            Please check the client and its related details before proceeding with the deletion.
          </Text>
        </Col>
        <Col>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={() => handleDeleteClient(id)}
            loading={loading}
          >
            Reload
          </Button>
        </Col>
      </Row>

      {/* Client Section */}
      <Card title="Client Information" style={{ marginBottom: "24px" }}>
        <ClientCard client={data?.client} />
      </Card>

      {/* Opportunities and Associated Tenders Section */}
      <Card title="Opportunities and Associated Tenders" style={{ marginBottom: "24px" }}>
        {data?.opportunities?.length > 0 ? (
          data?.opportunities?.map((opportunity) => (
            <OpportunityCard key={opportunity?._id} opportunity={opportunity} />
          ))
        ) : (
          <Alert message="No Opportunities Available" type="info" showIcon />
        )}
      </Card>

      {/* Business Development Section */}
      <Card title="Business Developments" style={{ marginBottom: "24px" }}>
        {data?.businessDevelopments?.length > 0 ? (
          data?.businessDevelopments?.map((bd) => (
            <BusinessDevelopmentCard key={bd?._id} bd={bd} />
          ))
        ) : (
          <Alert message="No Business Developments Available" type="info" showIcon />
        )}
      </Card>

      {/* Registrations Section */}
      <Card title="Registrations" style={{ marginBottom: "24px" }}>
        {data?.registrations?.length > 0 ? (
          data?.registrations?.map((registration) => (
            <RegistrationCard key={registration?._id} registration={registration} />
          ))
        ) : (
          <Alert message="No Registrations Available" type="info" showIcon />
        )}
      </Card>

      {/* Confirm Deletion Button */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Button
          type="primary"
          danger
          size="large"
          loading={loading}
          onClick={() => handleDeleteClient(id, 'true')} // finally deletes the client
        >
          Confirm Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteClientPage;
