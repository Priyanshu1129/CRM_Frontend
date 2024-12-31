// "use client";
// import React from "react";
// import { Row, Col } from "antd";
// import BarChart from "./component/bar-chart";
// import { colorConfig } from "@/config";

// const fetchData = async (entityName, year) => {
//   // Mock API call. Replace with your actual API logic.
//   return {
//     target: [100, 150, 200, 250],
//     actual: [90, 140, 180, 230],
//   };
// };

// const Dashboard = () => {
//   const entities = ["Entity A", "Entity B", "Entity C", "Entity D"];

//   return (
//     <div style={{ padding: "1rem", background: "#fff" }}>
//       {/* Centralized Legend */}
//       <div
//         style={{
//           marginBottom: "1rem",
//           display: "flex",
//           gap: "1rem",
//           justifySelf: "flex-end",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//           <div
//             style={{
//               width: "20px",
//               height: "20px",
//               borderRadius: "50%",
//               backgroundColor: colorConfig.primary,
//             }}
//           ></div>
//           <span>Target</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//           <div
//             style={{
//               width: "20px",
//               height: "20px",
//               borderRadius: "50%",
//               backgroundColor: "rgba(75, 192, 192, 0.5)",
//             }}
//           ></div>
//           <span>Actual</span>
//         </div>
//       </div>

//       {/* Bar Charts */}
//       <Row gutter={[16, 16]}>
//         {entities.map((entity) => (
//           <Col key={entity} xs={24} sm={24} md={12} lg={12}>
//             <BarChart entityName={entity} fetchData={fetchData} />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import React from "react";
import { Row, Col } from "antd";
import BarChart from "./component/bar-chart";
import { colorConfig } from "@/config";

const fetchData = async (entityName, year) => {
  // Mock API call. Replace with your actual API logic.
  return {
    target: [100, 150, 200, 250],
    actual: [90, 140, 180, 230],
  };
};

const Dashboard = () => {
  const entities = ["Overall", "Territory", "Industry", "Solution"];

  return (
    <div style={{ paddingTop: "1rem", background: "#fff" }}>
      {/* Centralized Legend */}
      <div
        style={{
          marginBottom: "1rem",
          marginRight: "1rem",
          display: "flex",
          gap: "1rem",
          justifySelf: "flex-end",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: colorConfig.primary,
            }}
          ></div>
          <span>Target</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            }}
          ></div>
          <span>Actual</span>
        </div>
      </div>

      {/* Bar Charts */}
      <Row gutter={[16, 16]}>
        {entities.map((entity) => (
          <Col key={entity} xs={24} sm={24} md={12} lg={12}>
            <BarChart
              entityName={entity}
              showSelector={entity !== "Entity A"} // Show selector for B, C, and D, but not A
              fetchData={fetchData}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
