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

const ContactCard = ({ contact }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  if (!contact) return null;

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
      children: `${contact.firstName || "N/A"} ${
        contact.lastName || ""
      }`.trim(),
    },
    {
      key: "2",
      label: "Job Title",
      children: contact.jobTitle || "N/A",
    },
    {
      key: "3",
      label: "Work Email",
      children: contact.workEmail || "N/A",
    },
    {
      key: "4",
      label: "Phone",
      children: contact.phone || "N/A",
    },
    {
      key: "1",
      label: "Entered By",
      children: renderProfile(contact.enteredBy, "Entered By"),
    },
  ];

  const expandableSectionItems = [
    {
      key: "2",
      label: "Mobile Phone",
      children: contact.mobilePhone || "N/A",
    },
    {
      key: "3",
      label: "Personal Email",
      children: contact.personalEmail || "N/A",
    },
    {
      key: "4",
      label: "Territory",
      children: contact.territory?.label || "N/A",
    },
    {
      key: "5",
      label: "Country",
      children: contact.country || "N/A",
    },
    {
      key: "6",
      label: "Relationship Degree",
      children: contact.relationshipDegree?.label || "N/A",
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
            {`${contact.firstName || "Contact"} ${
              contact.lastName || ""
            }`.trim()}
          </Title>
          <ActionButtons
            showUrl={`/contact/contact-details/${contact._id.toString()}`}
            deleteUrl={`/contact/delete-contact/${contact._id.toString()}`}
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
          <Avatar size={64} src={contact.avatar} />
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

export default ContactCard;
