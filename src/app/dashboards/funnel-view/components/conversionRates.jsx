import React from "react";
import { Card } from "antd";
import { colorConfig } from "@/config";
import { ArrowRightOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { head } from "lodash";
import Statistic from "antd/es/statistic/Statistic";

const headings = [
  {
    from: "Lead",
    to: "Prospect",
  },
  {
    from: "Prospect",
    to: "Qualification",
  },
  {
    from: "Qualification",
    to: "Proposal",
  },
  {
    from: "Proposal",
    to: "Follow up",
  },
  {
    from: "Follow up",
    to: "Closing",
  },
];

export const ConversionRates = ({ data }) => {
  return (
    <div>
      <h2>Conversion Rates</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {Object.entries(data)?.map(([key, value], index) => (
          <Card
            // loading={true}
            bodyStyle={{ padding: "0px" }}
            key={index}
            style={{
              width: "235px",
              borderRadius: 8,
              height: "160px",
              display: "flex",
              justifyContent: "center",
              gap: 20, // Center the content vertically
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 25,
                padding: "16px",
                width: "235px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  alignSelf: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "16px", // Large font size for the key
                    fontWeight: "500", // Bold text for the key
                    color: colorConfig.textGrayDark, // Optional: Text color
                    textAlign: "center", // Center text alignment
                  }}
                >
                  {headings[index].from}
                </div>
                <ArrowRightOutlined color={colorConfig.primaryf} />
                <div
                  style={{
                    fontSize: "16px", // Large font size for the key
                    fontWeight: "600", // Bold text for the key
                    color: colorConfig.textGrayDark, // Optional: Text color
                    textAlign: "center", // Center text alignment
                  }}
                >
                  {headings[index].to}
                </div>
              </div>
              <div
                style={{
                  fontSize: "24px", // Larger font size for the value
                  fontWeight: "bold", // Bold text for the value
                  color: `${colorConfig.primary}`, // Optional: Color for the value
                  textAlign: "center", // Center text alignment
                }}
              >
                {`${parseFloat(value).toFixed(2)} %`}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Statistic
                  contentStyle={{
                    display: "flex",
                    alignItems: "center", // Vertically center the content
                    justifyContent: "center", // Center the content horizontally
                  }}
                  value={Math.round(Math.random() * 100)} // Example percentage value
                  prefix={
                    <div
                      style={{
                        marginLeft: "5px",
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
                    textEmphasis: "Highlight",
                  }}
                />

                <div
                  style={{
                    fontSize: "12px", // Large font size for the key
                    fontWeight: "600", // Bold text for the key
                    color: colorConfig.textGrayLight, // Optional: Text color
                    textAlign: "center", // Center text alignment
                  }}
                >
                  Compared with last week
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
