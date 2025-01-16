import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Avatar,
  Space,
  Tooltip,
  Descriptions,
  Divider,
} from "antd";
import {
  EyeOutlined,
  DownOutlined,
  UpOutlined,
  UserOutlined,
  IdcardOutlined,
  SolutionOutlined,
  TagsOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";

const { Title } = Typography;

const TenderCard = ({ tender }) => {
  const [isTenderExpanded, setIsTenderExpanded] = useState(false);
  const router = useRouter();

  if (!tender) return null;

  const toggleTenderExpand = () => setIsTenderExpanded((prev) => !prev);

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
      label: "Entered By",
      children: renderProfile(tender.enteredBy, "Entered By"),
    },
    {
      key: "2",
      label: "Bid Manager",
      children: renderProfile(tender.bidManager, "Bid Manager"),
    },
    {
      key: "3",
      label: "Officer",
      children: renderProfile(tender.officer, "Officer"),
    },
    {
      key: "4",
      label: "Opportunity",
      children: tender.associatedOpportunity?.projectName || "N/A",
    },
    {
      key: "5",
      label: "Opportunity ID",
      children: tender.associatedOpportunity?.customId || "N/A",
    },
    {
      key: "6",
      label: "Stage",
      children: tender.stage?.label || "N/A",
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
            Associated Tender: {tender.rfpTitle || "N/A"}
          </Title>
          <Tooltip title="View Tender Details">
            <ActionButtons
              showUrl={`/tender/tender-details/${tender._id.toString()}`}
              deleteUrl={`/tender/delete-tender/${tender._id.toString()}`}
            />
          </Tooltip>
        </div>
      }
      headStyle={{ backgroundColor: colorConfig.primary }}
      bodyStyle={{ padding: "16px" }}
      style={{
        borderRadius: "8px",
        borderWidth: "1px",
        borderColor: colorConfig.primary,
        backgroundColor: "#f4f6f8",
      }}
    >
      {/* Top Section */}
      <Descriptions
        title="Tender Overview"
        bordered
        column={{ xs: 1, sm: 1, md: 2 }}
        items={topSectionItems}
      />

      {/* Expandable Section */}
      {isTenderExpanded && (
        <div style={{ marginTop: "16px" }}>
          <Divider />
          <Descriptions
            title="Tender Details"
            bordered
            column={{ xs: 1, sm: 1, md: 2 }}
          >
            <Descriptions.Item label="Tender ID">
              {tender.customId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Submission Due Date">
              {tender.submissionDueDate
                ? new Date(tender.submissionDueDate).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Bond Value">
              ${tender.bondValue?.toLocaleString() || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Bond Issue Date">
              {tender.bondIssueDate
                ? new Date(tender.bondIssueDate).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Tender Description">
              {tender.description || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}

      {/* Toggle Button */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          type="text"
          icon={isTenderExpanded ? <UpOutlined /> : <DownOutlined />}
          onClick={toggleTenderExpand}
        >
          {isTenderExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </Card>
  );
};

export default TenderCard;
