// import { theme } from "antd"
// import { Lato } from "next/font/google";
// const lato = Lato({ subsets: ["latin"], weight: "300" });



import { theme } from "antd";
import { Roboto } from "next/font/google"; // Change font as needed
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorBgContainer: "#f8f9fa", // Very light gray background for containers
    colorBgLayout: "#ffffff",    // Pure white layout background
    colorText: "#333333",        // Slightly softer black for text
    colorPrimary: "#007bff",     // Soft primary blue color for accents
  },
  components: {
    Layout: {
      headerBg: "#ffffff",         // White header background
      colorBgSider: "#f8f9fa",     // Light gray sidebar background
      colorTextHeader: "#333333",  // Softer text color in header
      colorTextSider: "#333333",   // Softer text color in sidebar
    },
    Card: {
      borderColor: "#e0e0e0",      // Light gray border for cards
      colorBgContainer: "#ffffff", // White background for card contents
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
    },
    Button: {
      colorPrimary: "#007bff",     // Primary color for buttons
      colorPrimaryHover: "#0056b3" // Slightly darker blue for hover state
    },
  }
};
