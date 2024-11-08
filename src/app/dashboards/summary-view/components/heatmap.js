// import React from "react";
// import { Card, Row, Col, Typography } from "antd";
// import "./heatmapGrid.css";

// const { Text } = Typography;

// const data = {
//     2022: {
//         Jan: 70, Feb: 40, Mar: 90, Apr: 55, May: 65, Jun: 30,
//         Jul: 80, Aug: 45, Sep: 85, Oct: 60, Nov: 75, Dec: 50
//     },
//     2023: {
//         Jan: 30, Feb: 80, Mar: 20, Apr: 70, May: 60, Jun: 40,
//         Jul: 90, Aug: 35, Sep: 75, Oct: 50, Nov: 65, Dec: 55
//     },
//     2024: {
//         Jan: 60, Feb: 50, Mar: 75, Apr: 45, May: 85, Jun: 25,
//         Jul: 55, Aug: 90, Sep: 65, Oct: 40, Nov: 80, Dec: 30
//     },
// };


// export const Heatmap = () => {
//     const years = [2022, 2023, 2024];
//     const months = [
//         "Jan", "Feb", "Mar",
//         "Apr", "May", "Jun",
//         "Jul", "Aug", "Sep",
//         "Oct", "Nov", "Dec"
//     ];

//     // Helper function to determine color based on data value
//     const getColorForValue = (value) => {
//         if (value > 80) return "#ff6b6b"; // Red for high values
//         if (value > 50) return "#f0ad4e"; // Orange for medium values
//         return "#8dc6ff"; // Blue for low values
//     };

//     return (
//         <div className="heatmap-grid" style={{ width: "50%" }}>
//             <Row>
//                 {years.map((year) => (
//                     <Col key={year} span={8}>
//                         <Card title={<Text strong>{year}</Text>} bordered={false}>
//                             <div className="months-grid">
//                                 {months.map((month) => {
//                                     const monthData = data?.[year]?.[month] || 0;
//                                     const color = getColorForValue(monthData);

//                                     return (
//                                         <div key={month} className="month-cell" style={{ backgroundColor: color }}>
//                                             <Text>{month}</Text>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </div>
//     );
// };


import React from "react";
import { Card, Row, Typography } from "antd";
import "./heatmapGrid.css";

const { Text } = Typography;

const data = {
    2022: {
        Jan: 70, Feb: 40, Mar: 90, Apr: 55, May: 65, Jun: 30,
        Jul: 80, Aug: 45, Sep: 85, Oct: 60, Nov: 75, Dec: 50
    },
    2023: {
        Jan: 30, Feb: 80, Mar: 20, Apr: 70, May: 60, Jun: 40,
        Jul: 90, Aug: 35, Sep: 75, Oct: 50, Nov: 65, Dec: 55
    },
    2024: {
        Jan: 60, Feb: 50, Mar: 75, Apr: 45, May: 85, Jun: 25,
        Jul: 55, Aug: 90, Sep: 65, Oct: 40, Nov: 80, Dec: 30
    },
};

export const Heatmap = () => {
    const years = [2022, 2023, 2024];
    const months = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    // Helper function to determine color based on data value
    const getColorForValue = (value) => {
        if (value > 80) return "#ff6b6b"; // Red for high values
        if (value > 50) return "#f0ad4e"; // Orange for medium values
        return "#8dc6ff"; // Blue for low values
    };

    return (
        <div className="heatmap-grid">
            <Card bordered={false} style={{ width: "100%" }}>
                <Row>
                    {years.map((year) => (
                        <div key={year} style={{ width: "33.33%", padding: "0 4px" }}>
                            <Text strong>{year}</Text>
                            <div className="months-grid">
                                {months.map((month) => {
                                    const monthData = data?.[year]?.[month] || 0;
                                    const color = getColorForValue(monthData);

                                    return (
                                        <div key={month} className="month-cell" style={{ backgroundColor: color }}>
                                            <Text>{month}</Text>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </Row>
            </Card>
        </div>
    );
};
