// import React, { useState } from "react";
// import { Card, Row, Col, Typography, Button, Avatar, Divider, Space, Tooltip } from "antd";
// import {
//   EyeOutlined,
//   DownOutlined,
//   UpOutlined,
//   UserOutlined,
//   IdcardOutlined,
//   SolutionOutlined,
//   FileTextOutlined,
//   TagsOutlined,
//   DollarCircleOutlined,
//   CalendarOutlined,
// } from "@ant-design/icons";
// import { colorConfig } from "@/config";
// import { useRouter } from "next/navigation";

// const { Title, Text } = Typography;

// const TenderCard = ({ tender }) => {
//   const [isTenderExpanded, setIsTenderExpanded] = useState(false);
//   const router = useRouter();

//   if (!tender) return null;

//   const toggleTenderExpand = () => setIsTenderExpanded((prev) => !prev);

//   const renderProfile = (user, label) => (
//     <Space size="small">
//       <Avatar src={user?.avatar} icon={!user?.avatar && <UserOutlined />} />
//       <div>
//         <Text strong>{`${user?.firstName || "N/A"} ${user?.lastName || ""}`.trim()}</Text>
//         <br />
//         <Text type="secondary">{label}</Text>
//       </div>
//     </Space>
//   );

//   return (
//     <Card
//       title={
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Title level={5} style={{ margin: 0, color: "#fff" }}>
//             Associated Tender: {tender.rfpTitle || "N/A"}
//           </Title>
//           <Tooltip title="View Tender Details">
//             <Button
//               onClick={() => {
//                 router.push(`/tender/tender-details/${tender._id.toString()}`);
//               }}
//               type="text"
//               icon={<EyeOutlined style={{ fontSize: 18, color: "#fff" }} />}
//             />
//           </Tooltip>
//         </div>
//       }
//       headStyle={{ backgroundColor: colorConfig.primary }}
//       bodyStyle={{ padding: "16px" }}
//       style={{
//         borderRadius: "8px",
//         borderWidth: "1px",
//         borderColor: colorConfig.primary,
//         backgroundColor: "#f4f6f8",
//       }}
//     >
//       {/* Top Section */}
//       <Row gutter={[16, 16]} align="middle">
//       <Col span={8}>{renderProfile(tender.enteredBy, "Entered By")}</Col>
//         <Col span={8}>{renderProfile(tender.bidManager, "Bid Manager")}</Col>
//         <Col span={8}>{renderProfile(tender.officer, "Officer")}</Col>
//         <Col span={24}>
//           <Divider style={{ margin: "4px 0" }} />
//         </Col>
//         <Col span={12}>
//           <Text>
//             <TagsOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//             Opportunity: <Text strong>{tender.associatedOpportunity?.projectName || "N/A"}</Text>
//           </Text>
//         </Col>
//         <Col span={12}>
//           <Text>
//             <IdcardOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//             Opportunity ID: <Text strong>{tender.associatedOpportunity?.customId || "N/A"}</Text>
//           </Text>
//         </Col>
//         <Col span={24}>
//           <Text>
//             <SolutionOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//             Stage: <Text strong>{tender.stage?.label || "N/A"}</Text>
//           </Text>
//         </Col>
       
       
//       </Row>

//       {/* Expandable Section */}
//       {isTenderExpanded && (
//         <div style={{ marginTop: "16px" }}>
//           <Divider />
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Text>
//                 <FileTextOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//                 Tender ID: <Text strong>{tender.customId || "N/A"}</Text>
//               </Text>
//             </Col>
//             <Col span={12}>
//               <Text>
//                 <CalendarOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//                 Submission Due Date:{" "}
//                 <Text strong>
//                   {tender.submissionDueDate
//                     ? new Date(tender.submissionDueDate).toLocaleDateString()
//                     : "N/A"}
//                 </Text>
//               </Text>
//             </Col>
//             <Col span={12}>
//               <Text>
//                 <DollarCircleOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//                 Bond Value:{" "}
//                 <Text strong>${tender.bondValue?.toLocaleString() || "N/A"}</Text>
//               </Text>
//             </Col>
//             <Col span={12}>
//               <Text>
//                 <CalendarOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//                 Bond Issue Date:{" "}
//                 <Text strong>
//                   {tender.bondIssueDate
//                     ? new Date(tender.bondIssueDate).toLocaleDateString()
//                     : "N/A"}
//                 </Text>
//               </Text>
//             </Col>
//             <Col span={24}>
//               <Text>
//                 <FileTextOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//                 Tender Description: <Text strong>{tender.description || "N/A"}</Text>
//               </Text>
//             </Col>
//           </Row>
//         </div>
//       )}

//       {/* Toggle Button */}
//       <div style={{ textAlign: "center", marginTop: "16px" }}>
//         <Button
//           type="text"
//           icon={isTenderExpanded ? <UpOutlined /> : <DownOutlined />}
//           onClick={toggleTenderExpand}
//         >
//           {isTenderExpanded ? "Show Less" : "Show More"}
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default TenderCard;


// import React, { useState } from "react";
// import { Card, Row, Col, Typography, Button, Avatar, Divider, Space, Tooltip, Descriptions } from "antd";
// import {
//   EyeOutlined,
//   DownOutlined,
//   UpOutlined,
//   UserOutlined,
//   IdcardOutlined,
//   SolutionOutlined,
//   TagsOutlined,
//   DollarCircleOutlined,
//   CalendarOutlined,
// } from "@ant-design/icons";
// import { colorConfig } from "@/config";
// import { useRouter } from "next/navigation";

// const { Title, Text } = Typography;

// const TenderCard = ({ tender }) => {
//   const [isTenderExpanded, setIsTenderExpanded] = useState(false);
//   const router = useRouter();

//   if (!tender) return null;

//   const toggleTenderExpand = () => setIsTenderExpanded((prev) => !prev);

//   const renderProfile = (user, label) => (
//     <Space size="small">
//       <Avatar src={user?.avatar} icon={!user?.avatar && <UserOutlined />} />
//       <div>
//         <Text strong>{`${user?.firstName || "N/A"} ${user?.lastName || ""}`.trim()}</Text>
//         <br />
//         <Text type="secondary">{label}</Text>
//       </div>
//     </Space>
//   );

//   return (
//     <Card
//       title={
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Title level={5} style={{ margin: 0, color: "#fff" }}>
//             Associated Tender: {tender.rfpTitle || "N/A"}
//           </Title>
//           <Tooltip title="View Tender Details">
//             <Button
//               onClick={() => {
//                 router.push(`/tender/tender-details/${tender._id.toString()}`);
//               }}
//               type="text"
//               icon={<EyeOutlined style={{ fontSize: 18, color: "#fff" }} />}
//             />
//           </Tooltip>
//         </div>
//       }
//       headStyle={{ backgroundColor: colorConfig.primary }}
//       bodyStyle={{ padding: "16px" }}
//       style={{
//         borderRadius: "8px",
//         borderWidth: "1px",
//         borderColor: colorConfig.primary,
//         backgroundColor: "#f4f6f8",
//       }}
//     >
//       {/* Top Section */}
//       <Row gutter={[16, 16]} align="middle">
//         <Col span={8}>{renderProfile(tender.enteredBy, "Entered By")}</Col>
//         <Col span={8}>{renderProfile(tender.bidManager, "Bid Manager")}</Col>
//         <Col span={8}>{renderProfile(tender.officer, "Officer")}</Col>
//         <Col span={24}>
//           <Divider style={{ margin: "4px 0" }} />
//         </Col>
//         <Col span={12}>
//           <Text>
//             <TagsOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//             Opportunity: <Text strong>{tender.associatedOpportunity?.projectName || "N/A"}</Text>
//           </Text>
//         </Col>
//         <Col span={12}>
//           <Text>
//             <IdcardOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//             Opportunity ID: <Text strong>{tender.associatedOpportunity?.customId || "N/A"}</Text>
//           </Text>
//         </Col>
//         <Col span={24}>
//           <Text>
//             <SolutionOutlined style={{ color: colorConfig.primary, marginRight: 8 }} />
//             Stage: <Text strong>{tender.stage?.label || "N/A"}</Text>
//           </Text>
//         </Col>
//       </Row>

//       {/* Expandable Section */}
//       {isTenderExpanded && (
//         <div style={{ marginTop: "16px" }}>
//           <Divider />
//           <Descriptions
//             title="Tender Details"
//             bordered
//             column={{ xs: 1, sm: 1, md: 2 }}
//           >
//             <Descriptions.Item label="Tender ID">{tender.customId || "N/A"}</Descriptions.Item>
//             <Descriptions.Item label="Submission Due Date">
//               {tender.submissionDueDate
//                 ? new Date(tender.submissionDueDate).toLocaleDateString()
//                 : "N/A"}
//             </Descriptions.Item>
//             <Descriptions.Item label="Bond Value">
//               ${tender.bondValue?.toLocaleString() || "N/A"}
//             </Descriptions.Item>
//             <Descriptions.Item label="Bond Issue Date">
//               {tender.bondIssueDate
//                 ? new Date(tender.bondIssueDate).toLocaleDateString()
//                 : "N/A"}
//             </Descriptions.Item>
//             <Descriptions.Item label="Tender Description">
//               {tender.description || "N/A"}
//             </Descriptions.Item>
//           </Descriptions>
//         </div>
//       )}

//       {/* Toggle Button */}
//       <div style={{ textAlign: "center", marginTop: "16px" }}>
//         <Button
//           type="text"
//           icon={isTenderExpanded ? <UpOutlined /> : <DownOutlined />}
//           onClick={toggleTenderExpand}
//         >
//           {isTenderExpanded ? "Show Less" : "Show More"}
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default TenderCard;


import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Avatar, Space, Tooltip, Descriptions, Divider } from "antd";
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Title level={5} style={{ margin: 0, color: "#fff" }}>
            Associated Tender: {tender.rfpTitle || "N/A"}
          </Title>
          <Tooltip title="View Tender Details">
            <Button
              onClick={() => {
                router.push(`/tender/tender-details/${tender._id.toString()}`);
              }}
              type="text"
              icon={<EyeOutlined style={{ fontSize: 18, color: "#fff" }} />}
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
            <Descriptions.Item label="Tender ID">{tender.customId || "N/A"}</Descriptions.Item>
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
