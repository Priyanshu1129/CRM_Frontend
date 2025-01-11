"use client";
import React, { useEffect } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { useParams } from "next/navigation";
import { useDeleteOpportunity } from "@/hooks/opportunity/useDeleteOpportunity";
import OpportunityCard from "./component/opportunityCard";
import TenderCard from "./component/tenderCard";
const { Title } = Typography;

const DeleteOpportunityPage = () => {
  const { id } = useParams();
  const { loading, data, handleDeleteOpportunity } = useDeleteOpportunity();

  // Automatically call handleDeleteOpportunity when the component renders
  useEffect(() => {
    if (!data || id !== data?.opportunity?._id.toString()) {
      handleDeleteOpportunity(id);
    }
  }, [id]);

  console.log("delete opportunity data", data);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card
        title={<Title level={3}>Delete Opportunity and Associated Tender</Title>}
        bordered={false}
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <OpportunityCard opportunity={data?.opportunity} />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <TenderCard tender={data?.tender} />
          </Col>
        </Row>
      </Card>

      <Row justify="center">
        <Col>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => handleDeleteOpportunity(id, 'true')}
          >
            Confirm Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteOpportunityPage;
