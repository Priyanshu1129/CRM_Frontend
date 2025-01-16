"use client";

import BusinessDevelopmentCard from "@/app/client/delete-client/[id]/component/BusinessDevelopmentCard";
import ClientCard from "@/app/client/delete-client/[id]/component/ClientCard";
import { useDeleteBusinessDevelopment } from "@/hooks/tempBd/useDeleteBd";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Typography, Divider, Row, Col, Alert } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { BackButton } from "@/components";

const { Title, Text } = Typography;

const DeleteMentionPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteBusinessDevelopment } = useDeleteBusinessDevelopment();

  // Fetch business development details when the page is loaded
  useEffect(() => {
    handleDeleteBusinessDevelopment(id);
  }, [id]);

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
        <BackButton buttonText={"Back"} />
        <Button
          icon={<ReloadOutlined />}
          type="default"
          onClick={() => handleDeleteBusinessDevelopment(id)}
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
        {/* Mention Details Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>Mention Details</div>
          <Alert
            style={{ padding: "6px" }}
            description="Below are the details of the mention. Please verify all fields before proceeding with deletion."
            type="info"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.data?.businessDevelopment ? (
              <BusinessDevelopmentCard bd={data?.data?.businessDevelopment} />
            ) : (
              <Alert message="No Mention Information Available" type="info" showIcon />
            )}
          </div>
        </section>

        <Divider />

        {/* Associated Client Section */}
        {data?.data?.businessDevelopment?.client && (
          <section style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "20px", fontWeight: 600 }}>Associated Client</div>
            <Alert
              style={{ padding: "6px" }}
              showIcon
              type="info"
              description="(Client will not be affected by deleting mention) The Mention is associated with the following client. Review the client details below."
            />
            <div style={{ marginTop: "6px" }}>
              <ClientCard client={data?.data?.businessDevelopment?.client} />
            </div>
          </section>
        )}

        <Divider />

        {/* Confirm Deletion Button Section */}
        <section style={{ marginTop: "24px", textAlign: "center" }}>
          <Button
            type="primary"
            danger
            size="large"
            loading={loading}
            onClick={() => handleDeleteBusinessDevelopment(id, "true")}
          >
            Confirm Delete
          </Button>
        </section>
      </div>
    </>
  );
};

export default DeleteMentionPage;
