import React, { useState } from "react";
import { Card, Row, Col, Avatar, Typography, Button, Space, Divider, Tag } from "antd";
import { EyeOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const BusinessDevelopmentCard = ({ bd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  if (!bd) return null;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const labelStyle = { color: "#808080", fontWeight: "500" }; // Greyish color for labels
  const fieldValueStyle = { fontWeight: "500" };

  const {
    client,
    salesChamp,
    territory,
    industry,
    solution,
    subSolution,
    connectionSource,
    potentialOffset,
    potentialRevenue,
    potentialTopLine,
    potentialProject,
    notes,
  } = bd;

  return (
    <Row justify="center" style={{ marginBottom: "16px" } }>
      <Col span={24}>
        <Card
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Title level={4} style={{ margin: 0, color: "#fff" }}>
                Business Development
              </Title>
              <Button
                onClick={()=>{
                  router.push(`/mention/mention-details/${bd._id.toString()}`)
                }}
                type="text"
                icon={<EyeOutlined style={{ fontSize: 18, color: "#fff" }} />}
              />
            </div>
          }
          bordered
          headStyle={{ backgroundColor: colorConfig.primary, paddingBottom : '0px'}}
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            borderWidth:'1px', borderColor : colorConfig.primary
          }}
          bodyStyle={{ padding: "16px" }}
        >
          {/* Directly Visible Section */}
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={6}>
              <Avatar size={64} src={client?.avatar} />
            </Col>
            <Col xs={24} sm={18}>
              <Text style={labelStyle}>Client:</Text> <Text style={fieldValueStyle}>{client?.name || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Sales Champion:</Text>{" "}
              <Text style={fieldValueStyle}>
                {salesChamp ? `${salesChamp.firstName} ${salesChamp.lastName}` : "N/A"}
              </Text>
              <br />
              <Text style={labelStyle}>Territory:</Text>{" "}
              <Text style={fieldValueStyle}>{territory?.label || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Industry:</Text>{" "}
              <Text style={fieldValueStyle}>{industry?.label || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Solution:</Text>{" "}
              <Text style={fieldValueStyle}>{solution?.label || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Sub-Solution:</Text>{" "}
              <Text style={fieldValueStyle}>{subSolution?.label || "N/A"}</Text>
            </Col>
          </Row>

          {/* Show More Section */}
          {isExpanded && (
            <div style={{ marginTop: "16px" }}>
              <Divider />
              <Text style={labelStyle}>Connection Source:</Text>{" "}
              <Text style={fieldValueStyle}>{connectionSource || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Potential Offset:</Text>{" "}
              <Text style={fieldValueStyle}>{potentialOffset || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Potential Revenue:</Text>{" "}
              <Text style={fieldValueStyle}>{potentialRevenue || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Potential Top Line:</Text>{" "}
              <Text style={fieldValueStyle}>{potentialTopLine || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Potential Project:</Text>{" "}
              <Text style={fieldValueStyle}>{potentialProject || "N/A"}</Text>
              <br />
              <Text style={labelStyle}>Notes:</Text>
              {notes?.length > 0 ? (
                <ul>
                  {notes.map((note, index) => (
                    <li key={index}>
                      <Text style={fieldValueStyle}>{note}</Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text style={fieldValueStyle}>No Notes Available</Text>
              )}
            </div>
          )}

          {/* Show More / Show Less Button */}
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Button
              type="text"
              icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
              onClick={toggleExpand}
              style={{ color: "#007CA6" }}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default BusinessDevelopmentCard;
