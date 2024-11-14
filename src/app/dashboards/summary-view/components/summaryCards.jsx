import React from "react";
import { Card, Col, Row, Statistic } from "antd";

// Sample data for each card
const summaryData = [
  {
    title: "Expected Revenue",
    key: "expectedRevenue",
    comparison: "comparison with previous period",
  },
  {
    title: "Actual Revenue",
    key: "actualRevenue",
    comparison: "comparison with previous period",
  },
  {
    title: "Opportunities Won",
    key: "opportunityWonCount",
    comparison: "comparison with previous period",
  },
  {
    title: "Open Opportunities",
    key: "openOpportunities",
    comparison: "comparison with previous period",
  },
];

// Component for individual summary cards
const SummaryCard = ({ title, value, loading }) => (
  <Card
    style={{
      borderRadius: 8,
      height: "120px",
      padding: "8px 12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Statistic
      loading={loading}
      title={title}
      suffix={title?.toLowerCase().includes("revenue") ? "$" : ""}
      value={value}
    />
  </Card>
);

// Main component for the card section
export const SummaryCards = ({ data, loading }) => {
  return (
    <Row gutter={[16, 16]} justify="space-between">
      {summaryData?.map(({ title, key }, index) => (
        <Col xs={24} sm={12} md={6} lg={6} key={index}>
          <SummaryCard
            loading={loading}
            title={title}
            value={loading ? "Loading..." : data ? data[key]?.value : "N/A"}
          />
        </Col>
      ))}
    </Row>
  );
};

export default SummaryCards;
