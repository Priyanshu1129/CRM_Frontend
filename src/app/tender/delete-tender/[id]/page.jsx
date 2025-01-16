"use client";

import OpportunityCard from "@/app/client/delete-client/[id]/component/OpportunityCard";
import TenderCard from "@/app/client/delete-client/[id]/component/tenderCard";
import { useEffect } from "react";
import { Divider, Typography, Row, Col, Button, Alert } from "antd";
import { useParams } from "next/navigation";
import { ReloadOutlined } from "@ant-design/icons";
import { BackButton } from "@/components";

const { useDeleteTender } = require("@/hooks/tender/useDeleteTender");

const DeleteTenderPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteTender } = useDeleteTender();

  // Fetch tender details when page is loaded
  useEffect(() => {
    handleDeleteTender(id);
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
        <BackButton buttonText={"Back to Tenders"} />
        <Button
          icon={<ReloadOutlined />}
          type="default"
          onClick={() => handleDeleteTender(id)}
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
        {/* Tender Details Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>Tender Details</div>
          <Alert
            style={{ padding: "6px" }}
            description="Review the tender details carefully before confirming the deletion."
            type="info"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.data?.tender ? (
              <TenderCard tender={data?.data?.tender} />
            ) : (
              <Alert message="No Tender Information Available" type="info" showIcon />
            )}
          </div>
        </section>

        <Divider />

        {/* Associated Opportunity Section */}
        {data?.data?.tender?.associatedOpportunity && (
          <section style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "20px", fontWeight: 600 }}>Associated Opportunity</div>
            <Alert
              style={{ padding: "6px" }}
              description="The following opportunity is associated with this tender. Deleting the tender will impact this opportunity."
              type="warning"
              showIcon
            />
            <div style={{ marginTop: "6px" }}>
              <OpportunityCard opportunity={data?.data?.tender?.associatedOpportunity} />
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
            onClick={() => handleDeleteTender(id, "true")}
          >
            Confirm Delete
          </Button>
        </section>
      </div>
    </>
  );
};

export default DeleteTenderPage;
