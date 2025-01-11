import React from "react";
import { Button, Card, Descriptions, Space, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const OpportunityCard = ({ opportunity }) => {
  if (!opportunity) return null;
  const router = useRouter();
  return (
    <Card
      bordered
      style={{
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      title={
        <Space>
          <Text strong style={{ fontSize: "16px" }}>
            Opportunity Details
          </Text>
          <Button
            shape="default"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/opportunity/opportunity-details/${opportunity._id.toString()}`)}
          />
        </Space>
      }
    >
      <Descriptions column={1} labelStyle={{ fontWeight: "bold" }}>
        <Descriptions.Item label="Project Name">
          {opportunity.projectName}
        </Descriptions.Item>
        <Descriptions.Item label="Custom ID">
          {opportunity.customId}
        </Descriptions.Item>
        <Descriptions.Item label="Confidence Level">
          {opportunity.confidenceLevel}%
        </Descriptions.Item>
        <Descriptions.Item label="Expected Sales">
          {opportunity.expectedSales}
        </Descriptions.Item>
        <Descriptions.Item label="Partnered With">
          {opportunity.partneredWith}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default OpportunityCard;
