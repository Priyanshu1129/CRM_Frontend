"use client";
import React, { useEffect } from "react";
import { Button, Typography, Divider, Row, Col, Alert, theme } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { useDeleteOpportunity } from "@/hooks/deal/useDeleteDeal";
import OpportunityCard from "@/app/client/delete-client/[id]/component/OpportunityCard";
import TenderCard from "@/app/client/delete-client/[id]/component/tenderCard";
import { BackButton } from "@/components";

const { Title } = Typography;

const DeleteOpportunityPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteOpportunity } = useDeleteOpportunity();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fetch opportunity and related data when the page is loaded
  useEffect(() => {
    handleDeleteOpportunity(id);
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
        <BackButton buttonText={"Back to Deals"} />
        <Button
          icon={<ReloadOutlined />}
          type="default"
          onClick={() => handleDeleteOpportunity(id)}
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
          minHeight: "100vh",
        }}
      >
        {/* Opportunity Details Section */}
        <section style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 , marginBottom : '8px'}}>Opportunity Details</div>
          <Alert
            style={{ padding: "6px" }}
            description="Below are the details of the opportunity. Please verify all information before proceeding with the deletion."
            type="info"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.opportunity ? (
              <OpportunityCard opportunity={data?.opportunity} />
            ) : (
              <Alert
                message="No Opportunity Information Available"
                type="info"
                showIcon
              />
            )}
          </div>
        </section>

        <Divider />

        {/* Associated Tender Section */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600 , marginBottom : '8px'}}>Associated Tender</div>
          <Alert
            style={{ padding: "6px" }}
            description="Deleting the opportunity will also remove the associated tender. Ensure this action aligns with your intentions."
            type="warning"
            showIcon
          />
          <div style={{ marginTop: "6px" }}>
            {data?.tender ? (
              <TenderCard tender={data?.tender} />
            ) : (
              <Alert
                message="No Tender Information Available"
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
              onClick={() => handleDeleteOpportunity(id, "true")}
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

export default DeleteOpportunityPage;
