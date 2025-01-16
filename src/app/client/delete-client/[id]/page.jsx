"use client";

import React, { useEffect } from "react";
import { Button, Row, Col, Spin, Alert, Card, Typography, Divider } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useDeleteClient } from "@/hooks/client/useDeleteClient";

// Import Card Components
import ClientCard from "./component/ClientCard";
import OpportunityCard from "./component/OpportunityCard";
import BusinessDevelopmentCard from "./component/BusinessDevelopmentCard";
import RegistrationCard from "./component/RegistrationCard";
import { ReloadOutlined } from "@ant-design/icons";
import { BackButton } from "@/components";

const { Title, Text } = Typography;

const DeleteClientPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { loading, data, handleDeleteClient } = useDeleteClient();

  // Call handleDeleteClient when the component is mounted or the id changes
  useEffect(() => {
    handleDeleteClient(id);
  }, []);

  return (
    <>
      {/* Top Action Bar */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton buttonText={"Back to Clients"} />
        <Button
          icon={<ReloadOutlined />}
          type="default"
          onClick={() => handleDeleteClient(id)}
          loading={loading}
        >
          Reload
        </Button>
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "24px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* Client Details Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>Client Details</div>
          <Alert
            style={{ padding: "6px" }}
            description="Below are the details of the client. Please verify all information before proceeding with the deletion."
            type="info"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.client ? (
              <ClientCard client={data?.client} />
            ) : (
              <Alert message="No Client Information Available" type="info" showIcon />
            )}
          </div>
        </section>

        <Divider />

        {/* Opportunities and Associated Tenders Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>Opportunities and Associated Tenders</div>
          <Alert
            style={{ padding: "6px" }}
            description="Deleting this client will also delete all associated opportunities and tenders."
            type="warning"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.opportunities?.length > 0 ? (
              data?.opportunities?.map((opportunity) => (
                <OpportunityCard key={opportunity?._id} opportunity={opportunity} />
              ))
            ) : (
              <Alert message="No Opportunities Available" type="info" showIcon />
            )}
          </div>
        </section>

        <Divider />

        {/* Business Developments Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>Business Developments</div>
          <Alert
            style={{ padding: "6px" }}
            description="Deleting the client will also delete all related business developments."
            type="warning"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.businessDevelopments?.length > 0 ? (
              data?.businessDevelopments?.map((bd) => (
                <BusinessDevelopmentCard key={bd?._id} bd={bd} />
              ))
            ) : (
              <Alert message="No Business Developments Available" type="info" showIcon />
            )}
          </div>
        </section>

        <Divider />

        {/* Registrations Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>Registrations</div>
          <Alert
            style={{ padding: "6px" }}
            description="Deleting the client will also delete all associated registrations."
            type="warning"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.registrations?.length > 0 ? (
              data?.registrations?.map((registration) => (
                <RegistrationCard key={registration?._id} registration={registration} />
              ))
            ) : (
              <Alert message="No Registrations Available" type="info" showIcon />
            )}
          </div>
        </section>

        <Divider />

        {/* Confirm Deletion Button Section */}
        <section style={{ marginTop: "24px", textAlign: "center" }}>
          <Button
            type="primary"
            danger
            size="large"
            loading={loading}
            onClick={() => handleDeleteClient(id, "true")}
          >
            Confirm Delete
          </Button>
        </section>
      </div>
    </>
  );
};

export default DeleteClientPage;
