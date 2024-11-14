import React from "react";
import { Card, Col, Row, Statistic } from "antd";

export const ConversionRates = ({ data }) => {
  return (
    <div>
      <h2>Conversion Rates</h2>
      <Row gutter={[16, 16]} justify="start">
        {Object.entries(data)?.map(([key, value], index) => (
          <Col xs={24} sm={12} md={8} lg={4} key={index}> {/* lg={4} ensures each card takes up 4 out of 20 columns */}
            <Card
              style={{
                borderRadius: 8,
                height: "160px", // You can adjust height based on your requirement
                // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Adds a slight shadow for better card appearance
                display: "flex",
                justifyContent: "center", // Center the content
                alignItems: "center", // Center the content
              }}
            >
              <Statistic
                title={key.replace(/([A-Z])/g, " $1").toUpperCase()} // Convert camelCase to readable title
                value={value}
                precision={2}
                suffix="%"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
