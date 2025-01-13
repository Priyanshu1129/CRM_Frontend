import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Divider, Space } from "antd";
import { EyeOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";
const { Title, Text } = Typography;


const  TenderCard = ({tender}) => {
  const [isTenderExpanded, setIsTenderExpanded] = useState(false);
  const toggleTenderExpand = () => {
    setIsTenderExpanded((prev) => !prev);
  };
  const router = useRouter()
    if(!tender) return null;
    return(
        <Card
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Title level={5} style={{ margin: 0, color: "#fff" }}>
                Associated Tender: {tender.rfpTitle || "N/A"}
              </Title>
              <Button
               onClick={()=>{
                router.push(`/tender/tender-details/${tender._id.toString()}`)
              }}
                type="text"
                icon={<EyeOutlined style={{ fontSize: 18, color: "#fff" }} />}
              />
            </div>
          }
          headStyle={{ backgroundColor: colorConfig.primary }}
          bodyStyle={{ padding: "16px" }}
          style={{
            // marginTop: "16px",
            borderRadius: "8px",
            borderWidth: "1px",
            borderColor: colorConfig.primary,
            backgroundColor: "#f4f6f8",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text>Tender ID:</Text> <Text strong>{tender.customId || "N/A"}</Text>
            </Col>
            <Col span={12}>
              <Text>RFP Title:</Text> <Text strong>{tender.rfpTitle || "N/A"}</Text>
            </Col>
            <Col span={12}>
              <Text>Submission Due Date:</Text>{" "}
              <Text strong>
                {tender.submissionDueDate
                  ? new Date(tender.submissionDueDate).toLocaleDateString()
                  : "N/A"}
              </Text>
            </Col>
            <Col span={12}>
              <Text>Bond Value:</Text> <Text strong>${tender.bondValue?.toLocaleString() || "N/A"}</Text>
            </Col>
          </Row>

          {isTenderExpanded && (
            <div style={{ marginTop: "16px" }}>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text>Bond Issue Date:</Text>{" "}
                  <Text strong>
                    {tender.bondIssueDate
                      ? new Date(tender.bondIssueDate).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text>Bond Expiry Date:</Text>{" "}
                  <Text strong>
                    {tender.bondExpiry
                      ? new Date(tender.bondExpiry).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text>Stage:</Text> <Text strong>{tender.stage?.label || "N/A"}</Text>
                </Col>
                <Col span={12}>
                  <Text>Stage Explanation:</Text>{" "}
                  <Text strong>{tender.stageExplanation || "N/A"}</Text>
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
    )
}

export default TenderCard;