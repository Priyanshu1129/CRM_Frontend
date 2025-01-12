import React from "react";
import { Button, Card, Descriptions, Space, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const TenderCard = ({ tender }) => {
  const router = useRouter();
  if (!tender) return null;
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
            Tender Details
          </Text>
          <Button
            icon={<EyeOutlined />}
            onClick={() => router.push(`/tender/tender-details/${tender._id.toString()}`)}
          />
        </Space>
      }
    >
      <Descriptions column={1} labelStyle={{ fontWeight: "bold" }}>
        <Descriptions.Item label="RFP Title">
          {tender.rfpTitle}
        </Descriptions.Item>
        <Descriptions.Item label="Custom ID">
          {tender.customId}
        </Descriptions.Item>
        <Descriptions.Item label="Submission Mode">
          {tender.submissionMode}
        </Descriptions.Item>
        <Descriptions.Item label="Bond Value">
          {tender.bondValue}
        </Descriptions.Item>
        <Descriptions.Item label="Reference">
          {tender.reference}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TenderCard;
