import React, { useState } from "react";
import {
  Card,
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
} from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";

const { Title } = Typography;

const BusinessDevelopmentCard = ({ bd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  if (!bd) return null;

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
      label: "Client",
      children: bd.client?.name || "N/A",
    },
    {
      key: "2",
      label: "Sales Champion",
      children: renderProfile(bd.salesChamp, "Sales Champion"),
    },
    {
      key: "3",
      label: "Territory",
      children: bd.territory?.label || "N/A",
    },
    {
      key: "4",
      label: "Industry",
      children: bd.industry?.label || "N/A",
    },
    {
      key: "5",
      label: "Solution",
      children: bd.solution?.label || "N/A",
    },
    {
      key: "6",
      label: "Sub-Solution",
      children: bd.subSolution?.label || "N/A",
    },
  ];

  const expandableSectionItems = [
    {
      key: "7",
      label: "Connection Source",
      children: bd.connectionSource || "N/A",
    },
    {
      key: "8",
      label: "Potential Offset",
      children: bd.potentialOffset || "N/A",
    },
    {
      key: "9",
      label: "Potential Revenue",
      children: `$${bd.potentialRevenue?.toLocaleString() || "N/A"}`,
    },
    {
      key: "10",
      label: "Potential Top Line",
      children: `$${bd.potentialTopLine?.toLocaleString() || "N/A"}`,
    },
    {
      key: "11",
      label: "Potential Project",
      children: bd.potentialProject || "N/A",
    },
    {
      key: "12",
      label: "Notes",
      children: bd.notes?.length ? (
        <ul>
          {bd.notes.map((note, index) => (
            <li key={index}>
              <Typography.Text>{note}</Typography.Text>
            </li>
          ))}
        </ul>
      ) : (
        "No Notes Available"
      ),
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
            Business Development
          </Title>
          <Tooltip title="View Details">
            <ActionButtons
              showUrl={`/opportunity/mention/mention-details/${bd._id.toString()}`}
              deleteUrl={`/opportunity/mention/delete-mention/${bd._id.toString()}`}
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
        title="Overview"
        bordered
        column={{ xs: 1, sm: 1, md: 2 }}
        items={topSectionItems}
      />

      {/* Expandable Section */}
      {isExpanded && (
        <div style={{ marginTop: "16px" }}>
          <Divider />
          <Descriptions
            title="Details"
            bordered
            column={{ xs: 1, sm: 1, md: 2 }}
            items={expandableSectionItems}
          />
        </div>
      )}

      {/* Toggle Button */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          type="text"
          icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
          onClick={toggleExpand}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </Card>
  );
};

export default BusinessDevelopmentCard;
