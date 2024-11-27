// import React from "react";
// import Card from "antd/es/card/Card";

// // Shimmer loader component
// const BubbleShimmer = () => {
//   return (
//     <Card style={styles.loaderContainer}>
//       {/* Top Section for Bubble (Simulated) */}
//       <div style={styles.topSection}>
//         <div style={styles.shimmerBubble}></div>
//         <div style={styles.shimmerBubble}></div>
//         <div style={styles.shimmerBubble}></div>
//       </div>

//       {/* Bottom Section for Legends (Simulated) */}
//       <div style={{}}>
//         <div style={styles.bottomSection}>
//           <div style={styles.shimmerLegend}></div>
//           <div style={styles.shimmerLegend}></div>
//           <div style={styles.shimmerLegend}></div>
//         </div>
//         <div style={styles.bottomSection}>
//           <div style={styles.shimmerLegend}></div>
//           <div style={styles.shimmerLegend}></div>
//           <div style={styles.shimmerLegend}></div>
//         </div>
//         <div style={styles.bottomSection}>
//           <div style={styles.shimmerLegend}></div>
//           <div style={styles.shimmerLegend}></div>
//           <div style={styles.shimmerLegend}></div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default BubbleShimmer;

// // Shimmer loader styles
// const styles = {
//   loaderContainer: {
//     padding: "5px",
//     backgroundColor: "#f7f7f7",
//     borderRadius: "8px",
//     boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
//     maxWidth: "500px",
//     margin: "auto",
//   },
//   topSection: {
//     height: "255px", // Height for top section
//     backgroundColor: "#f7f7f7", // Lighter gray for background
//     borderRadius: "8px",
//     position: "relative",
//     overflow: "hidden",
//     marginBottom: "20px", // Space between sections
//     width: "100%",
//     background: "linear-gradient(90deg, #f6f7f8 25%, #eaeaea 50%, #f6f7f8 75%)", // Lighter shimmer gradient
//     backgroundSize: "200% 100%",
//     animation: "shimmer 2.5s infinite linear", // Smoother animation timing
//     zIndex: 1,
//     animationDelay: "0s",
//   },
//   bottomSection: {
//     display: "flex",
//     justifyContent: "space-between",
//     gap: "10px",
//     marginBottom: "5px",
//     marginTop: "5px",
//   },
//   shimmerLegend: {
//     width: "120px",
//     height: "20px",
//     background: "linear-gradient(90deg, #f6f7f8 25%, #eaeaea 50%, #f6f7f8 75%)", // Lighter shimmer gradient
//     backgroundSize: "200% 100%",
//     animation: "shimmer 2.5s infinite linear", // Smoother animation timing
//     borderRadius: "4px",
//   },
//   shimmerBubble: {
    
//   },
// };

// // Keyframes for shimmer effect
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(`
//   @keyframes shimmer {
//     0% {
//       background-position: 200% 0;
//     }
//     100% {
//       background-position: -200% 0;
//     }
//   }
// `, styleSheet.cssRules.length);

import React, { useEffect } from "react";
import Card from "antd/es/card/Card";

// Shimmer loader component
const BubbleShimmer = () => {
  useEffect(() => {
    // Ensure the code only runs on the client-side
    if (typeof window !== "undefined" && document) {
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(
        `
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `,
        styleSheet.cssRules.length
      );
    }
  }, []);

  return (
    <Card style={styles.loaderContainer}>
      {/* Top Section for Bubble (Simulated) */}
      <div style={styles.topSection}>
        <div style={styles.shimmerBubble}></div>
        <div style={styles.shimmerBubble}></div>
        <div style={styles.shimmerBubble}></div>
      </div>

      {/* Bottom Section for Legends (Simulated) */}
      <div>
        <div style={styles.bottomSection}>
          <div style={styles.shimmerLegend}></div>
          <div style={styles.shimmerLegend}></div>
          <div style={styles.shimmerLegend}></div>
        </div>
        <div style={styles.bottomSection}>
          <div style={styles.shimmerLegend}></div>
          <div style={styles.shimmerLegend}></div>
          <div style={styles.shimmerLegend}></div>
        </div>
        <div style={styles.bottomSection}>
          <div style={styles.shimmerLegend}></div>
          <div style={styles.shimmerLegend}></div>
          <div style={styles.shimmerLegend}></div>
        </div>
      </div>
    </Card>
  );
};

export default BubbleShimmer;

// Shimmer loader styles
const styles = {
  loaderContainer: {
    padding: "5px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "auto",
  },
  topSection: {
    height: "255px", // Height for top section
    backgroundColor: "#f7f7f7", // Lighter gray for background
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    marginBottom: "20px", // Space between sections
    width: "100%",
    background: "linear-gradient(90deg, #f6f7f8 25%, #eaeaea 50%, #f6f7f8 75%)", // Lighter shimmer gradient
    backgroundSize: "200% 100%",
    animation: "shimmer 2.5s infinite linear", // Smoother animation timing
    zIndex: 1,
    animationDelay: "0s",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "5px",
    marginTop: "5px",
  },
  shimmerLegend: {
    width: "120px",
    height: "20px",
    background: "linear-gradient(90deg, #f6f7f8 25%, #eaeaea 50%, #f6f7f8 75%)", // Lighter shimmer gradient
    backgroundSize: "200% 100%",
    animation: "shimmer 2.5s infinite linear", // Smoother animation timing
    borderRadius: "4px",
  },
  shimmerBubble: {
    
  },
};
