import React from "react";
import { Card, Col, Row, Space, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { PiMoneyWavyBold, PiTargetBold, PiTrophyBold } from "react-icons/pi";
import { MdOutlinePendingActions } from "react-icons/md";
import { colorConfig } from "@/config";
let primaryColor = colorConfig.primary
let colorBgPrimary = colorConfig.primaryBackground

// Sample data for each card
const summaryData = [
  {
    title: "Expected Revenue",
    key: "expectedRevenue",
    icon:<PiTargetBold size={32} color={primaryColor} />,
    comparison: "comparison with previous period",
  },
  {
    title: "Actual Revenue",
    key: "actualRevenue",
    icon:<PiMoneyWavyBold size={32} color={primaryColor} />,
    comparison: "comparison with previous period",
  },
  {
    title: "Opportunities Won",
    key: "opportunityWonCount",
    icon:<PiTrophyBold size={32} color={primaryColor} />,
    comparison: "comparison with previous period",
  },
  {
    title: "Open Opportunities",
    key: "openOpportunities",
    icon:<MdOutlinePendingActions size={32} color={primaryColor}  />,
    comparison: "comparison with previous period",
  },
];

// Component for individual summary cards
const SummaryCard = ({ title, value, loading , icon}) => (
<Card
  style={{
    borderRadius: 8,
    height: "120px",
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
    
    // justifyContent: "space-between",
  }}

  bodyStyle={{ 
    padding: '0px',
    paddingLeft : '5px',
    paddingRight : '5px',
     }}
>
  <Space style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    {/* Statistic Section */}
    {/* <Statistic
  loading={loading}
  title={title}
  prefix={"$"}
  value={value}
  suffix={
    <Statistic
      value={34} // Example value for percentage
      prefix={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            background: "#d4f8d4", // Light green background for the circle
            color: "#52c41a", // Green color for the arrow
            fontWeight: "bold", // Bold arrow
          }}
        >
          <ArrowUpOutlined />
        </div>
      }
      suffix={
        <span style={{ fontWeight: "bold" }}>%</span> // Bold percentage symbol
      }

      valueStyle={{ color: "#52c41a",fontWeight: 700,  fontSize: "12px" }} // Smaller size and green color
    />
  }
/> */}
<Space style={{display : "flex", flexDirection : 'column', alignItems : "flex-start"}}>
<Statistic
  style={{}}
  loading={loading}
  title={title}
  titleStyle={{ marginBottom: "10px" , fontWeight : 900 }}
  prefix={"$"}
  value={value}
  valueStyle={{fontWeight : 'bold', fontSize : '2rem'}}
  suffix={
    <Statistic
    contentStyle={{
      display: "flex",
      alignItems: "center",  // Vertically center the content
      justifyContent: "center", // Center the content horizontally
    }}
      value={34} // Example percentage value
      prefix={
        <div
          style={{
            marginLeft:"5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            background: "#d4f8d4", // Light green circle background
            color: "#52c41a", // Green color for the arrow
            fontWeight: "bold", // Force bold arrow
            fontFamily: "Arial, sans-serif", // Specify bold-capable font
          }}
        >
          <ArrowUpOutlined />
        </div>
      }
      suffix={
        <span
          style={{
            fontWeight: "bold", // Ensure bold for the percentage symbol
          }}
        >
          %
        </span>
      }
      valueStyle={{
        color: "#52c41a", // Green color for value
        fontWeight: "bold", // Bold value
        fontFamily: "Arial, sans-serif", // Use font with bold capability
        fontSize: "14px", // Smaller size for nested content
        textEmphasis:"Highlight"
      }}
    />
  }
/>
<div style={{marginTop : '2px', fontWeight : 400, fontSize : '12px', color: `${colorConfig.primary}` }}>Compared with last week</div>

</Space>



    {/* Icon Section with Circle Background */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%", // Ensures the shape is a circle
        width: "40px", // Fixed width and height to maintain circle
        height: "40px",
        background: `${colorBgPrimary}`, // Circle background color
        color: "#fff", // Icon color for contrast
      }}
    >
      {icon}
    </div>
  </Space>
</Card> 

);

// Main component for the card section
export const SummaryCards = ({ data, loading }) => {
  return (
    <Row gutter={[16, 16]} justify="space-between" style={{marginBottom : '10px'}}>
      {summaryData?.map(({ title, key ,icon}, index) => (
        <Col xs={24} sm={12} md={6} lg={6} key={index}>
          <SummaryCard
            loading={loading}
            icon={icon}
            title={title}
            value={loading ? "Loading..." : data ? data[key]?.value : "N/A"}
          />
        </Col>
      ))}
    </Row>
  );
};

export default SummaryCards;
