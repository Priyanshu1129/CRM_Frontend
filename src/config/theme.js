import { theme } from "antd"
import { Lato } from "next/font/google";
const lato = Lato({ subsets: ["latin"], weight: "300" });

export const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorBgContainer: "#f0f2f5",  // Light background color for containers
    colorBgLayout: "#ffffff",      // Light background color for layout (e.g., header, sidebar)
    colorText: "#000000",          // Dark text color
    colorPrimary: "#1677ff",       // Primary color (adjust as needed)
    // fontFamily: `${lato.style.fontFamily}, sans-serif`
  },
  components: {
    Layout: {
      headerBg: "#ffffff",  // Light header background color
      colorBgSider: "#ffffff",   // Light sidebar background color
      colorTextHeader: "#000000", // Header text color
      colorTextSider: "#000000",  // Sidebar text color
    },
  }
};
