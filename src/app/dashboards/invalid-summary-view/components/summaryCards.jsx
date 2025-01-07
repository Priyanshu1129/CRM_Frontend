// import React from "react";
// import { Card, Col, Row, Space, Statistic } from "antd";
// import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
// import { PiMoneyWavyBold, PiTargetBold, PiTrophyBold } from "react-icons/pi";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { colorConfig } from "@/config";
// import { formatAmount } from "@/utilities";

// let primaryColor = colorConfig.primary;
// let colorBgPrimary = colorConfig.primaryBackground;

// // Sample data for each card
// const summaryData = [
//   {
//     title: "Expected Revenue",
//     key: "expectedRevenue",
//     icon: <PiTargetBold size={28} color={primaryColor} />,
//     comparison: "comparison with previous period",
//   },
//   {
//     title: "Actual Revenue",
//     key: "actualRevenue",
//     icon: <PiMoneyWavyBold size={28} color={primaryColor} />,
//     comparison: "comparison with previous period",
//   },
//   {
//     title: "Opportunities Won",
//     key: "opportunityWonCount",
//     icon: <PiTrophyBold size={28} color={primaryColor} />,
//     comparison: "comparison with previous period",
//   },
//   {
//     title: "Open Opportunities",
//     key: "openOpportunities",
//     icon: <MdOutlinePendingActions size={28} color={primaryColor} />,
//     comparison: "comparison with previous period",
//   },
// ];

// // Component for individual summary cards
// const SummaryCard = ({ title, value, loading, icon, compare, keyName }) => {
//   console.log("key-card", keyName, title);
//   return (
//     <Card
//       style={{
//         borderRadius: 8,
//         height: "120px",
//         padding: "8px 12px",
//         display: "flex",
//         flexDirection: "column",
//         // justifyContent: "space-between",
//       }}
//       bodyStyle={{
//         padding: "0px",
//         paddingLeft: "5px",
//         paddingRight: "5px",
//       }}
//     >
//       <Space
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Statistic Section */}
//         <Space
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             justifyContent: "space-between",
//             // background: "yellow",
//           }}
//         >
//           <Statistic
//             // style={{ background: "green" }}
//             loading={loading}
//             title={title}
//             titleStyle={{ marginBottom: "10px" }}
//             prefix={
//               keyName == "actualRevenue" || keyName == "expectedRevenue"
//                 ? "$"
//                 : ""
//             }
//             value={formatAmount(value)}
//             valueStyle={{ fontSize: "1.5rem" }}
//             suffix={
//               <Statistic
//                 contentStyle={{
//                   display: "flex",
//                   alignItems: "center", // Vertically center the content
//                   justifyContent: "center", // Center the content horizontally
//                 }}
//                 value={compare.percentage} // Example percentage value
//                 prefix={
//                   <div
//                     style={{
//                       marginLeft: "5px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       borderRadius: "50%",
//                       width: "20px",
//                       height: "20px",
//                       background: "#d4f8d4", // Light green circle background
//                       color: "#52c41a", // Green color for the arrow
//                       fontWeight: "bold", // Force bold arrow
//                       fontFamily: "Arial, sans-serif", // Specify bold-capable font
//                     }}
//                   >
//                     <ArrowUpOutlined />
//                   </div>
//                 }
//                 suffix={
//                   <span
//                     style={{
//                       fontWeight: "bold", // Ensure bold for the percentage symbol
//                     }}
//                   >
//                     %
//                   </span>
//                 }
//                 valueStyle={{
//                   color: "#52c41a", // Green color for value
//                   fontWeight: "bold", // Bold value
//                   fontFamily: "Arial, sans-serif", // Use font with bold capability
//                   fontSize: "14px", // Smaller size for nested content
//                   textEmphasis: "Highlight",
//                 }}
//               />
//             }
//           />
//           {!loading && (
//             <div
//               style={{
//                 marginTop: "2px",
//                 fontWeight: 400,
//                 fontSize: "12px",
//                 color: `${colorConfig.primary}`,
//               }}
//             >
//               {compare?.description}
//             </div>
//           )}
//         </Space>

//         {/* Icon Section with Circle Background */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             borderRadius: "50%", // Ensures the shape is a circle
//             width: "40px", // Fixed width and height to maintain circle
//             height: "40px",
//             background: `${colorBgPrimary}`, // Circle background color
//           }}
//         >
//           {icon}
//         </div>
//       </Space>
//     </Card>
//   );
// };

// // Main component for the card section
// export const SummaryCards = ({ data, loading }) => {
//   return (
//     <Row
//       gutter={[18, 18]}
//       justify="space-between"
//       style={{ marginBottom: "10px" }}
//     >
//       {summaryData?.map(({ title, key, icon }, index) => (
//         <Col xs={24} sm={12} md={12} lg={6} key={index}>
//           <SummaryCard
//             loading={loading}
//             icon={icon}
//             title={title}
//             keyName={key}
//             compare={loading ? "Loading..." : data ? data[key]?.compare : "N/A"}
//             value={
//               loading
//                 ? "Loading..."
//                 : data
//                 ? data[key]?.value?.toFixed(0)
//                 : "N/A"
//             }
//           />
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default SummaryCards;
