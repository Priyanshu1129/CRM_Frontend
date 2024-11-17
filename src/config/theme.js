// // theme.js
// import { theme } from 'antd';  // Import Ant Design's theme object

// // Colors and configuration
// export const colorConfig = {
//   primary: "#0066ff",            // Primary color for buttons, links, etc.
//   primaryHover: "#0052cc",       // Slightly darker primary color for hover states
//   primaryBackground: "#e0f0ff",  // Background color for primary elements
//   baseColor: "#f5f5f5",          // Light background color for layout
//   cardBorder: "#d9d9d9",
//   menuHoverBgColor : "#e0f0ff",
//   menuHoverTextColor:"#000",     // Border color for cards
//   menuActiveBgColor:"#0066ff",
//   menuActiveTextColor:"#ffffff",
//   tableHeaderBgColor: "#f0f0f0", // Background color for table header
//   tableRowHoverBgColor: "#f9f9f9",  // Background color for row hover
//   tableRowSelectedBgColor: "#e6f7ff",  // Background color for selected row
//   tableBorderColor: "#d9d9d9",  // Border color for the table
//   tableTextColor: "#333333",    // Default text color for table content
//   tableHeaderTextColor: "#000000",  // Text color for table headers
// };

// export const customTheme = {
//   algorithm: theme.defaultAlgorithm,  // Use the default algorithm for light mode
//   token: {
//     colorBgContainer: "#ffffff",   // Background color for containers (white for cards)
//     colorBgLayout: colorConfig.baseColor,  // Background color for layout (light gray)
//     colorText: "#333333",           // Text color (dark gray)
//     colorPrimary: colorConfig.primary,  // Primary color for key UI elements
//   },
//   components: {
//     Layout: {
//       headerBg: "#ffffff",  // White background for the header
//       colorBgSider: "#ffffff",  // White background for the sidebar
//       colorTextHeader: "#333333",  // Text color in the header
//       colorTextSider: "#333333",   // Text color in the sidebar
//       boxShadowHeader: "0 2px 8px rgba(0, 0, 0, 0.4)",  // Shadow for the header
//       boxShadowSider: "2px 0 8px rgba(0, 0, 0, 0.4)",   // Shadow for the sidebar
//     },
//     Card: {
//       borderColor: colorConfig.cardBorder,  // Set the border color for cards
//       colorBgContainer: "#ffffff",  // White background for card containers
//     },
//     Button: {
//       colorPrimary: colorConfig.primary,  // Primary color for buttons
//       colorPrimaryHover: colorConfig.primaryHover,  // Hover color for buttons
//     },
//     Menu: {
//       colorItemText: "#333333", // Default text color
//       colorItemTextHover: colorConfig.menuHoverTextColor, // Hover state color for menu item
//       colorItemTextActive: colorConfig.menuActiveTextColor, // Active state color for menu item
//       colorItemBgHover: colorConfig.menuHoverBgColor, // Background color for hover state
//       colorItemBgActive: colorConfig.menuActiveBgColor, // Background color for active state
//       colorItemTextSelected: colorConfig.menuActiveTextColor,
//       colorItemBgSelected: colorConfig.menuActiveBgColor
//     },
//     Table: {
//       // Table header customization
//       colorBgHeader: colorConfig.tableHeaderBgColor,  // Background color for table header
//       colorTextHeader: colorConfig.tableHeaderTextColor,  // Text color for table headers
//       colorBorder: colorConfig.tableBorderColor,  // Border color for table
//       // Row hover customization
//       colorBgRowHover: colorConfig.tableRowHoverBgColor,  // Background color when hovering a row
//       colorBgRowSelected: colorConfig.tableRowSelectedBgColor,  // Background color for selected rows
//       colorText: colorConfig.tableTextColor,  // Default text color for table rows
//       // Custom alternate row styles can be added manually, for example:
//       // Setting row alternate colors
//       // colorBgAlternateRow: '#f5f5f5'  // For alternate row coloring (optional)
//     },

//   },
// };
import { BorderOutlined } from '@ant-design/icons';
import { theme } from 'antd';  // Import Ant Design's theme object
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';


// Colors and configuration
export const colorConfig = {
  primary: "#0066ff",            // Primary color for buttons, links, etc.
  // primary: linear-gradient(to right, #f6d365 0%, #000 51%, #f6d365 100%),            // Primary color for buttons, links, etc.
  primaryHover: "#0052cc",       // Slightly darker primary color for hover states
  primaryBackground: "#e0f0ff",  // Background color for primary elements
  // baseColor: "#f5f5f5",          // Light background color for layout
  baseColor: "#ededef",          // Light background color for layout
  // cardBorder: "#d9d9d9",
  cardBorder: "#cfd8e3",
  menuHoverBgColor: "#e0f0ff",
  menuHoverTextColor: "#000",     // Border color for cards
  menuActiveBgColor: "#0066ff",
  menuActiveTextColor: "#ffffff",
  tableHeaderBgColor: "#fafafa", // Background color for table header
  tableRowHoverBgColor: "#f0f0f0",  // Background color for row hover
  tableRowSelectedBgColor: "#e6f4ff",  // Background color for selected row
  tableBorderColor: "#f0f0f0",  // Border color for the table
  tableTextColor: "#333333",    // Default text color for table content
  tableHeaderTextColor: "#fff",  // Text color for table headers
  tableRowSelectedHoverBgColor: "#bae0ff",
   // Hover color for selected row


  textGrayLight : "#91969b" ,
  textGrayDark : "#767b80" ,
};

setTwoToneColor(colorConfig.primary);

export const customTheme = {
  algorithm: theme.defaultAlgorithm,  // Use the default algorithm for light mode
  token: {
    colorBgContainer: "#ffffff",   // Background color for containers (white for cards)
    colorBgLayout: colorConfig.baseColor,  // Background color for layout (light gray)
    colorText: "#333333",           // Text color (dark gray)
    colorPrimary: colorConfig.primary,  // Primary color for key UI elements
    colorLink: "#1677ff", // Link color
    colorLinkActive: "#0958d9", // Active link color
    colorLinkHover: "#69b1ff", // Hover link color
    colorPrimaryBorder: "#91caff", // Border color for primary buttons
    colorSplit: "rgba(5, 5, 5, 0.06)",  // Color for split lines
    colorTextDescription: "rgba(0, 0, 0, 0.45)",  // Description text color
    colorTextDisabled: "rgba(0, 0, 0, 0.25)",  // Disabled text color
    colorTextHeading: "rgba(0, 0, 0, 0.88)",  // Heading text color
    
  },
  components: {
    Layout: {
      headerBg: "#ffffff",  // White background for the header
      colorBgSider: "#ffffff",  // White background for the sidebar
      colorTextHeader: "#333333",  // Text color in the header
      colorTextSider: "#333333",   // Text color in the sidebar
      borderColorSider : "#000",
      boxShadowHeader: "2px 2px 8px rgba(0, 0, 0, 0.4)",  // Shadow for the header
      boxShadowSider: "2px 0 8px rgba(0, 0, 0, 0.4)",   // Shadow for the sidebar
    },
    Card: {
      borderColor: colorConfig.cardBorder,  // Set the border color for cards
      colorBgContainer: "#fff",  // White background for card containers
    },
    Button: {
      colorPrimary: colorConfig.primary,  // Primary color for buttons
      colorPrimaryHover: colorConfig.primaryHover,  // Hover color for buttons
    },
    Menu: {
      colorItemText: "#333333", // Default text color
      colorItemTextHover: colorConfig.menuHoverTextColor, // Hover state color for menu item
      colorItemTextActive: colorConfig.menuActiveTextColor, // Active state color for menu item
      colorItemBgHover: colorConfig.menuHoverBgColor, // Background color for hover state
      colorItemBgActive: colorConfig.menuActiveBgColor, // Background color for active state
      // colorItemTextSelected: colorConfig.menuActiveTextColor,
      // colorItemBgSelected: colorConfig.menuActiveBgColor,

      
    },
    Table: {
      // colorBgContainer: "#ffffff", // Table background color
      // colorText: colorConfig.tableTextColor, // Default text color
      // colorPrimary
      headerColor: colorConfig.tableHeaderTextColor, // Header text color
      headerBg: colorConfig.primary,  // Header background color
      footerBg : "#000",
      rowHoverBg: colorConfig.tableRowHoverBgColor,  // Row hover background color
      rowSelectedBg: colorConfig.tableRowSelectedBgColor, // Selected row background color
      rowSelectedHoverBg: colorConfig.tableRowSelectedHoverBgColor, // Hover color for selected rows
      borderColor: colorConfig.tableBorderColor, // Border color
      split: colorConfig.colorSplit, // Split color for borders between rows
      // colorTextHeading
      itemTextHover: colorConfig.menuHoverTextColor, // Hover text color
      itemTextActive: colorConfig.menuActiveTextColor, // Active text color for rows

      // Default background
      rowBgColor: "#000", // Background for odd rows
      colorBgAlternateRow: "#000", // Background for even rows
    },
  },
};
