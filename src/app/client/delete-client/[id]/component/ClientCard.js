import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Avatar,
  Descriptions,
  Divider,
  Row,
  Col,
  Space,
} from "antd";
import {
  EyeOutlined,
  DownOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";

const { Title, Text } = Typography;

const ClientCard = ({ client }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  if (!client) return null;

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const renderProfile = (user, label) => (
    <Space size="small">
      <Avatar src={user?.avatar} icon={!user?.avatar && <UserOutlined />} />
      <div>
        <Typography.Text strong>
          {`${user?.firstName || "N/A"} ${user?.lastName || ""}`.trim()}
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">{label}</Typography.Text>
      </div>
    </Space>
  );

  const topSectionItems = [
    {
      key: "1",
      label: "Name",
      children: client.name || "N/A",
    },
    {
      key: "1",
      label: "Entered By",
      children: renderProfile(client.enteredBy, "Entered By"),
    },
    {
      key: "2",
      label: "Territory",
      children: client.territory?.label || "N/A",
    },
    {
      key: "3",
      label: "Industry",
      children: client.industry?.label || "N/A",
    },
    {
      key: "4",
      label: "Sub-Industry",
      children: client.subIndustry?.label || "N/A",
    },
  ];

  const expandableSectionItems = [
    {
      key: "1",
      label: "Entered By",
      children: renderProfile(client.enteredBy, "Entered By"),
    },
    {
      key: "2",
      label: "Primary Relationship",
      children: renderProfile(
        client.primaryRelationship,
        "Primary relationship"
      ),
    },
    {
      key: "3",
      label: "Secondary Relationship",
      children: renderProfile(
        client.secondaryRelationship,
        "Secondary relationship"
      ),
    },
    {
      key: "5",
      label: "Offering",
      children: client.offering || "N/A",
    },
    {
      key: "6",
      label: "Annual Revenue",
      children: `$${client.annualRevenue?.toLocaleString() || "N/A"}`,
    },
    {
      key: "7",
      label: "Incorporation Type",
      children: client.incorporationType?.label || "N/A",
    },
    {
      key: "8",
      label: "Classification",
      children: client.classification?.label || "N/A",
    },
    {
      key: "9",
      label: "Relationship Status",
      children: client.relationshipStatus?.label || "N/A",
    },
    {
      key: "10",
      label: "Priority",
      children: client.priority || "N/A",
    },
  ];

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={5} style={{ margin: 0, color: "#fff" }}>
            {client.name || "Client"}
          </Title>
          <ActionButtons
            showUrl={`/client/client-details/${client._id.toString()}`}
            deleteUrl={`/client/delete-client/${client._id.toString()}`}
          />
        </div>
      }
      headStyle={{ backgroundColor: colorConfig.primary }}
      bodyStyle={{ padding: "16px" }}
      style={{
        marginBottom: "16px",
        borderRadius: "8px",
        borderWidth: "1px",
        borderColor: colorConfig.primary,
        backgroundColor: "#f4f6f8",
      }}
    >
      {/* Avatar and Top Section */}
      <Row style={{ marginBottom: "16px" }}>
        <Col span={4}>
          <Avatar size={64} src={client.avatar} />
        </Col>
        <Col span={20}>
          <Descriptions
            bordered
            column={{ xs: 1, sm: 1, md: 2 }}
            items={topSectionItems}
          />
        </Col>
      </Row>

      {/* Expandable Section */}
      {isExpanded && (
        <div style={{ marginTop: "16px" }}>
          <Divider />
          <Descriptions
            title="Additional Details"
            bordered
            column={{ xs: 1, sm: 1, md: 2 }}
            items={expandableSectionItems}
          />
        </div>
      )}

      {/* Expand/Collapse Button */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          type="text"
          icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
          onClick={toggleExpand}
          style={{ color: colorConfig.primary }}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </Card>
  );
};

export default ClientCard;
