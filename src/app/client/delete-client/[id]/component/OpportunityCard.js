import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Divider, Space } from "antd";
import { EyeOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const OpportunityCard = ({ opportunity }) => {
  const router = useRouter();
  const [isOpportunityExpanded, setIsOpportunityExpanded] = useState(false);
  const [isTenderExpanded, setIsTenderExpanded] = useState(false);

  if (!opportunity) return null;

  const toggleOpportunityExpand = () => {
    setIsOpportunityExpanded((prev) => !prev);
  };

  const toggleTenderExpand = () => {
    setIsTenderExpanded((prev) => !prev);
  };

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

  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Title level={4} style={{ margin: 0, color: "#fff" }}>
            Opportunity: {projectName || "N/A"}
          </Title>
          <Button
           onClick={()=>{
            router.push(`/opportunity/opportunity-details/${opportunity._id.toString()}`)
          }}
            type="text"
            icon={<EyeOutlined style={{ fontSize: 18, color: "#fff" }} />}
          />
        </div>
      }
      headStyle={{ backgroundColor: colorConfig.primary }}
      bodyStyle={{ padding: "16px" }}
      style={{ marginBottom: "16px", borderRadius: "8px", borderWidth: '1px', borderColor: colorConfig.primary }}
    >
      {/* Opportunity Section */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Text strong style={{ color: colorConfig.primary }}>
            Opportunity Details
          </Text>
        </Col>
        <Col span={12}>
          <Text>Custom ID:</Text> <Text strong>{customId || "N/A"}</Text>
        </Col>
        <Col span={12}>
          <Text>Sales Champion:</Text>{" "}
          <Text strong>{salesChamp ? `${salesChamp.firstName} ${salesChamp.lastName}` : "N/A"}</Text>
        </Col>
        <Col span={12}>
          <Text>Sales Stage:</Text> <Text strong>{salesStage?.label || "N/A"}</Text>
        </Col>
        <Col span={12}>
          <Text>Sub-Stage:</Text> <Text strong>{salesSubStage?.label || "N/A"}</Text>
        </Col>
        <Col span={12}>
          <Text>Solution:</Text> <Text strong>{solution?.label || "N/A"}</Text>
        </Col>
        <Col span={12}>
          <Text>Sales Top Line:</Text> <Text strong>${salesTopLine?.toLocaleString() || "N/A"}</Text>
        </Col>
        <Col span={12}>
          <Text>Total Revenue:</Text>{" "}
          <Text strong>${totalRevenue?.toLocaleString() || "N/A"}</Text>
        </Col>
      </Row>

      {isOpportunityExpanded && (
        <div style={{ marginTop: "16px" }}>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Text strong>Additional Details</Text>
            </Col>
            <Col span={12}>
              <Text>Opening Date:</Text> <Text strong>{new Date(openingDate).toLocaleDateString() || "N/A"}</Text>
            </Col>
            <Col span={12}>
              <Text>Closing Date:</Text> <Text strong>{closingDate ? new Date(closingDate).toLocaleDateString() : "N/A"}</Text>
            </Col>
          </Row>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          type="text"
          icon={isOpportunityExpanded ? <UpOutlined /> : <DownOutlined />}
          onClick={toggleOpportunityExpand}
        >
          {isOpportunityExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>

      {/* Associated Tender Section (Nested Card) */}
      {associatedTender && (
        <Card
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Title level={5} style={{ margin: 0, color: "#fff" }}>
                Associated Tender: {associatedTender.rfpTitle || "N/A"}
              </Title>
              <Button
               onClick={()=>{
                router.push(`/tender/tender-details/${associatedTender._id.toString()}`)
              }}
                type="text"
                icon={<EyeOutlined style={{ fontSize: 18, color: "#fff" }} />}
              />
            </div>
          }
          headStyle={{ backgroundColor: colorConfig.primary }}
          bodyStyle={{ padding: "16px" }}
          style={{
            marginTop: "16px",
            borderRadius: "8px",
            borderWidth: "1px",
            borderColor: colorConfig.primary,
            backgroundColor: "#f4f6f8",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text>Tender ID:</Text> <Text strong>{associatedTender.customId || "N/A"}</Text>
            </Col>
            <Col span={12}>
              <Text>RFP Title:</Text> <Text strong>{associatedTender.rfpTitle || "N/A"}</Text>
            </Col>
            <Col span={12}>
              <Text>Submission Due Date:</Text>{" "}
              <Text strong>
                {associatedTender.submissionDueDate
                  ? new Date(associatedTender.submissionDueDate).toLocaleDateString()
                  : "N/A"}
              </Text>
            </Col>
            <Col span={12}>
              <Text>Bond Value:</Text> <Text strong>${associatedTender.bondValue?.toLocaleString() || "N/A"}</Text>
            </Col>
          </Row>

          {isTenderExpanded && (
            <div style={{ marginTop: "16px" }}>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text>Bond Issue Date:</Text>{" "}
                  <Text strong>
                    {associatedTender.bondIssueDate
                      ? new Date(associatedTender.bondIssueDate).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text>Bond Expiry Date:</Text>{" "}
                  <Text strong>
                    {associatedTender.bondExpiry
                      ? new Date(associatedTender.bondExpiry).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text>Stage:</Text> <Text strong>{associatedTender.stage?.label || "N/A"}</Text>
                </Col>
                <Col span={12}>
                  <Text>Stage Explanation:</Text>{" "}
                  <Text strong>{associatedTender.stageExplanation || "N/A"}</Text>
                </Col>
              </Row>
            </div>
          )}

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
      )}
    </Card>
  );
};

export default OpportunityCard;
