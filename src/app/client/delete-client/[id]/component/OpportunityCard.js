import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Space,
  Tooltip,
  Descriptions,
  Divider,
} from "antd";
import { EyeOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";
import TenderCard from "./tenderCard";
import ActionButtons from "@/components/ActionButtons";

const { Title } = Typography;

const OpportunityCard = ({ opportunity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  if (!opportunity) return null;

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const {
    customId,
    projectName,
    openingDate,
    closingDate,
    salesChamp,
    solution,
    salesStage,
    salesSubStage,
    salesTopLine,
    totalRevenue,
    associatedTender,
  } = opportunity;

  const topSectionItems = [
    {
      key: "1",
      label: "Custom ID",
      children: customId || "N/A",
    },
    {
      key: "2",
      label: "Project Name",
      children: projectName || "N/A",
    },
    {
      key: "3",
      label: "Sales Champion",
      children: salesChamp
        ? `${salesChamp.firstName} ${salesChamp.lastName}`
        : "N/A",
    },
    {
      key: "4",
      label: "Solution",
      children: solution?.label || "N/A",
    },
    {
      key: "5",
      label: "Total Revenue",
      children: `$${totalRevenue?.toLocaleString() || "N/A"}`,
    },
  ];

  const expandableSectionItems = [
    {
      key: "6",
      label: "Sales Top Line",
      children: `$${salesTopLine?.toLocaleString() || "N/A"}`,
    },
    {
      key: "7",
      label: "Sales Stage",
      children: salesStage?.label || "N/A",
    },
    {
      key: "8",
      label: "Sub-Stage",
      children: salesSubStage?.label || "N/A",
    },
    {
      key: "9",
      label: "Opening Date",
      children: openingDate
        ? new Date(openingDate).toLocaleDateString()
        : "N/A",
    },
    {
      key: "10",
      label: "Closing Date",
      children: closingDate
        ? new Date(closingDate).toLocaleDateString()
        : "N/A",
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
            Opportunity: {projectName || "N/A"}
          </Title>
          <Tooltip title="View Details">
            <ActionButtons
              showUrl={`/deal/deal-details/${opportunity._id.toString()}`}
              deleteUrl={`/deal/delete-deal/${opportunity._id.toString()}`}
            />
          </Tooltip>
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
      {/* Top Section */}
      <Descriptions
        title="Opportunity Details"
        bordered
        column={{ xs: 1, sm: 1, md: 2 }}
        items={topSectionItems}
      />

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
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>

      {/* Associated Tender Section */}
      {associatedTender && associatedTender._id && (
        <div style={{ marginTop: "16px" }}>
          <Divider />
          <TenderCard tender={associatedTender} />
        </div>
      )}
    </Card>
  );
};

export default OpportunityCard;
