import React from "react";
import { Card, Col, Row } from "antd";

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
    title: "Opportunities Project/Won",
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
const SummaryCard = ({ title, value, comparison }) => (
  <Card
    // bordered={false}
    style={{
      borderRadius: 8,
      height: "120px", // Reduced height for a rectangular look
      padding: "8px 12px", // Minimized padding
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h3 style={{ fontSize: "14px", margin: "4px 0" }}>{title}:</h3>
    <h2 style={{ fontSize: "20px", margin: "4px 0" }}>{value}</h2>
    <p style={{ fontSize: "10px", color: "#888", margin: 0 }}>{comparison}</p>
  </Card>
);

// Main component for the card section
export const SummaryCards = ({ data }) => {
  return (
    <Row gutter={[16, 16]} justify="space-between">
      {summaryData.map(({ title, comparison, key }, index) => (
        <Col xs={24} sm={12} md={6} lg={6} key={index}>
          <SummaryCard
            {...{ title, comparison, value: data[key]?.value || 0 }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default SummaryCards;
