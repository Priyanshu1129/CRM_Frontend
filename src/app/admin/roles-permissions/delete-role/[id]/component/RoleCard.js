import React from "react";
import { Card, Row, Col, Tag, Typography, Divider, Tooltip } from "antd";
import { UserOutlined, FileDoneOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";

const { Title, Text } = Typography;

const RoleDetails = ({ role }) => {
  if (!role) return <p>No role data available</p>;

  const { name, permissions, createdAt, updatedAt } = role;

  return (
    <div style={{ padding: "0px", maxWidth: "1200px",  }}>
      {/* Role Header */}
      <div style={{ padding : "0px", marginBottom: "5px", borderColor: colorConfig.primary }}>
        <Title level={4} style={{ color: colorConfig.primary }}>
          <UserOutlined style={{ marginRight: 8, color: colorConfig.primary }} />
          Role: {name}
        </Title>
      </div>

      {/* Permissions */}
      {/* <Title level={5} style={{ marginBottom: "10px", color: colorConfig.primary }}>
        <FileDoneOutlined style={{ marginRight: 8 }} />
        Permissions
      </Title> */}
      {/* <Row gutter={[16, 16]}>
        {permissions.map((permission) => (
          <Col xs={24} sm={12} md={8} key={permission._id}>
            <Card
              size="small"
              bordered={true}
              style={{
                border: `1px solid ${colorConfig.primary}`,
                borderRadius: "6px",
                backgroundColor: "#fafafa",
              }}
            >
              <Title
                level={5}
                style={{
                  marginBottom: "10px",
                  color: colorConfig.primary,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Tooltip title={`Entity: ${permission.entity.entity}`}>
                  <FileDoneOutlined />
                </Tooltip>
                {permission.entity.label}
              </Title>
              <Text>
                <strong>Entity:</strong> {permission.entity.entity}
              </Text>
              <Text>
                <strong>Allowed Actions:</strong>
              </Text>
              <div style={{ marginTop: "10px" }}>
                {permission.allowedActions.map((action) => (
                  <Tooltip key={action} title={`Action: ${action}`}>
                    <Tag
                      icon={<CheckCircleOutlined />}
                      color={colorConfig.primary}
                      style={{ marginBottom: "8px" }}
                    >
                      {action}
                    </Tag>
                  </Tooltip>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default RoleDetails;
