"use client";
import React, { useState, useMemo } from "react";
import { Select, Row, Col, Card } from "antd";
import { colorConfig } from "@/config";
import ChartComponent from "./component/bar-chart";
import { YearPicker } from "../components";
import { useDispatch } from "react-redux";

// const data = {
//   territorySummaryView: [
//     {
//       entityId: "123e4567e89b12d3a4564266",
//       label: "Chennai SCRU-I",
//       year: "2025",
//       targets: {
//         q1: 15000,
//         q2: 20000,
//         q3: 18000,
//         q4: 22000,
//       },
//       actual: {
//         q1: 12000,
//         q2: 18000,
//         q3: 15000,
//         q4: 21000,
//       },
//     },
//     {
//       entityId: "789f1234e56g78h901i45672",
//       label: "Tamil Nadu - Others",
//       year: "2025",
//       targets: {
//         q1: 3000,
//         q2: 5000,
//         q3: 7000,
//         q4: 8000,
//       },
//       actual: {
//         q1: 2000,
//         q2: 4500,
//         q3: 6500,
//         q4: 7500,
//       },
//     },
//     {
//       entityId: "456j7890k1234l56789m0123",
//       label: "Bangalore SCRU",
//       year: "2025",
//       targets: {
//         q1: 5000,
//         q2: 10000,
//         q3: 15000,
//         q4: 20000,
//       },
//       actual: {
//         q1: 4500,
//         q2: 9000,
//         q3: 14000,
//         q4: 19000,
//       },
//     },
//   ],
//   industrySummaryView: [
//     {
//       entityId: "89n0123o456p789q1234r567",
//       label: "BFSI: Banking, Financial Services and Insurance",
//       year: "2025",
//       targets: {
//         q1: 20000,
//         q2: 25000,
//         q3: 30000,
//         q4: 35000,
//       },
//       actual: {
//         q1: 18000,
//         q2: 24000,
//         q3: 29000,
//         q4: 34000,
//       },
//     },
//     {
//       entityId: "678s901t2345u6789v01234",
//       label: "EUR: Energy, Utility and Resources",
//       year: "2025",
//       targets: {
//         q1: 15000,
//         q2: 20000,
//         q3: 25000,
//         q4: 30000,
//       },
//       actual: {
//         q1: 14000,
//         q2: 19000,
//         q3: 24000,
//         q4: 29000,
//       },
//     },
//     {
//       entityId: "456w789x1234y56789z0123",
//       label: "TMET: Telecom, Media, Entertainment and Technology",
//       year: "2025",
//       targets: {
//         q1: 12000,
//         q2: 15000,
//         q3: 18000,
//         q4: 20000,
//       },
//       actual: {
//         q1: 11000,
//         q2: 14000,
//         q3: 17000,
//         q4: 19000,
//       },
//     },
//   ],
//   solutionSummaryView: [
//     {
//       entityId: "987a654b321c098d765e432f",
//       label: "Strategy",
//       year: "2025",
//       targets: {
//         q1: 25000,
//         q2: 30000,
//         q3: 35000,
//         q4: 40000,
//       },
//       actual: {
//         q1: 24000,
//         q2: 29000,
//         q3: 34000,
//         q4: 39000,
//       },
//     },
//     {
//       entityId: "123g456h789i012j345k678l",
//       label: "Digital",
//       year: "2025",
//       targets: {
//         q1: 18000,
//         q2: 22000,
//         q3: 26000,
//         q4: 30000,
//       },
//       actual: {
//         q1: 17000,
//         q2: 21000,
//         q3: 25000,
//         q4: 29000,
//       },
//     },
//     {
//       entityId: "567m890n123o456p789q012r",
//       label: "Data",
//       year: "2025",
//       targets: {
//         q1: 15000,
//         q2: 20000,
//         q3: 25000,
//         q4: 30000,
//       },
//       actual: {
//         q1: 14000,
//         q2: 19000,
//         q3: 24000,
//         q4: 29000,
//       },
//     },
//   ],
// };

const generateData = (numEntities) => {
  const labels = [
    "Chennai SCRU-I",
    "Tamil Nadu - Others",
    "Bangalore SCRU",
    "BFSI: Banking, Financial Services and Insurance",
    "EUR: Energy, Utility and Resources",
    "TMET: Telecom, Media, Entertainment and Technology",
    "Strategy",
    "Digital",
    "Data",
  ];

  const getRandomTarget = () => Math.floor(Math.random() * 50000) + 1000; // Random target between 1000 and 50000
  const getRandomActual = (target) =>
    Math.floor(Math.random() * (target + 1000)); // Random actual, less than target

  const generateEntity = (label) => {
    const targets = {};
    const actual = {};

    ["q1", "q2", "q3", "q4"].forEach((quarter) => {
      targets[quarter] = getRandomTarget();
      actual[quarter] = getRandomActual(targets[quarter]);
    });

    return {
      entityId: `${Math.random().toString(36).substring(7)}`,
      label,
      year: "2025",
      targets,
      actual,
    };
  };

  const territorySummaryView = [];
  const industrySummaryView = [];
  const solutionSummaryView = [];

  // Create large number of entities
  for (let i = 0; i < numEntities / 3; i++) {
    territorySummaryView.push(generateEntity(labels[i % labels.length]));
    industrySummaryView.push(generateEntity(labels[(i + 3) % labels.length]));
    solutionSummaryView.push(generateEntity(labels[(i + 6) % labels.length]));
  }

  return {
    territorySummaryView,
    industrySummaryView,
    solutionSummaryView,
  };
};

const data = generateData(300); // Generates 300 entities (100 each for the three categories)

// console.log(largeData);

const { Option } = Select;

const Dashboard = () => {
  const [year, setYear] = useState("2025");
  const [quarter, setQuarter] = useState("q1");

  const handleYearChange = (value) => setYear(value);
  const handleQuarterChange = (value) => setQuarter(value);

  // Filter data based on selected year and quarter
  const chartData = (dataView) => {
    const filteredData = dataView.map((item) => ({
      label: item.label,
      targets: item.targets[quarter], // Only using the selected quarter's data
      actual: item.actual[quarter], // Only using the selected quarter's data
    }));

    const labels = filteredData.map((item) =>
      item.label.length > 10 ? item.label.substring(0, 10) + "..." : item.label
    );
    const targets = filteredData.map((item) => item.targets);
    const actual = filteredData.map((item) => item.actual);

    return {
      labels: labels,
      datasets: [
        {
          label: "Target",
          data: targets,
          backgroundColor: "#F86041", // Red color for target
          borderRadius: 0, // Rounded edges
          barThickness: 30,
          stack: "combined",
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: colorConfig.primary, // Blue color for actual
          borderRadius: 4, // Rounded edges
          barThickness: 30,
          stack: "combined",
        },
      ],
    };
  };

  return (
    <div style={{}}>
      {/* Filters at the top corner */}
      <Row gutter={16} justify="start" style={{ marginBottom: "24px" }}>
        <Col>
          <YearPicker onChange={(value) => {}} />
        </Col>
        <Col>
          <Select
            value={quarter}
            onChange={handleQuarterChange}
            style={{ width: 120 }}
            placeholder="Select Quarter"
          >
            <Option value="q1">Quarter 1</Option>
            <Option value="q2">Quarter 2</Option>
            <Option value="q3">Quarter 3</Option>
            <Option value="q4">Quarter 4</Option>
          </Select>
        </Col>
      </Row>

      {/* Industry Chart */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Card
            title={
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                Industry Overview
              </span>
            }
          >
            <ChartComponent chartData={chartData(data.industrySummaryView)} />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                Territory Overview
              </span>
            }
          >
            <ChartComponent chartData={chartData(data.territorySummaryView)} />
          </Card>
        </Col>
      </Row>

      {/* Solution Chart */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Card title="Solution Overview">
            <ChartComponent chartData={chartData(data.solutionSummaryView)} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
