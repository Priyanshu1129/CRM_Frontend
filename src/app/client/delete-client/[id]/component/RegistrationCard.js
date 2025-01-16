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
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";

const { Title, Text } = Typography;

const RegistrationCard = ({ registration }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  if (!registration) return null;

  const toggleExpand = () => setIsExpanded((prev) => !prev);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
      label: "Registration Champ",
      children: renderProfile(
        registration.registrationChamp,
        "Registration Champ"
      ),
    },
    {
      key: "2",
      label: "Status",
      children: registration.status?.label || "N/A",
    },
    {
      key: "3",
      label: "Registration Date",
      children:
        new Date(registration.registrationDate).toLocaleDateString() || "N/A",
    },
    {
      key: "4",
      label: "Expiry Date",
      children: new Date(registration.expiryDate).toLocaleDateString() || "N/A",
    },
  ];

  const expandableSectionItems = [
    {
      key: "1",
      label: "Entered By",
      children: renderProfile(registration.enteredBy, "Entered By"),
    },
    {
      key: "2",
      label: "Primary Contact",
      children: registration.primaryContact || "N/A",
    },
    {
      key: "3",
      label: "Submitted Documents",
      children: registration.submittedDocuments || "N/A",
    },
    {
      key: "4",
      label: "Other Details",
      children: registration.otherDetails || "N/A",
    },
    {
      key: "5",
      label: "Website Details",
      children: (
        <Space size="small">
          <Text strong>Username:</Text>{" "}
          {registration.websiteDetails.username || "N/A"}
          <br />
          <Text strong>Password:</Text>
          <Space>
            {showPassword ? registration.websiteDetails.password : "••••••••"}
            <Button
              type="text"
              icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={togglePasswordVisibility}
            />
          </Space>
          <br />
          <Text strong>Link:</Text> {registration.websiteDetails.link || "N/A"}
        </Space>
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
            {registration.registrationChamp?.firstName || "Registration"}
          </Title>
          
          <ActionButtons
            showUrl={`/registration/registration-details/${registration._id.toString()}`}
            deleteUrl={`/registration/delete-registration/${registration._id.toString()}`}
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
      {/* Top Section */}
      <Row style={{ marginBottom: "16px" }}>
        <Col span={4}>
          <Avatar size={64} src={registration.registrationChamp?.avatar} />
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

export default RegistrationCard;
