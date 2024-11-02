"use client"
import { Inter, Lato } from "next/font/google";
import { ConfigProvider, theme } from 'antd';
import { ProtectedPage } from "./protectedPage";
import ErrorBoundary from "./ErrorBoundary";
import "./globals.css"
import { StoreProvider } from "./storeProvider";
const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"], weight: "300" });

export default function RootLayout({ children }) {
  const customTheme = {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorBgContainer: "#f0f2f5",  // Light background color for containers
      colorBgLayout: "#ffffff",      // Light background color for layout (e.g., header, sidebar)
      colorText: "#000000",          // Dark text color
      colorPrimary: "#1890ff",       // Primary color (adjust as needed)
      // fontFamily: `${lato.style.fontFamily}, sans-serif`
    },
    components: {
      Layout: {
        colorBgHeader: "#ffffff",  // Light header background color
        colorBgSider: "#ffffff",   // Light sidebar background color
        colorTextHeader: "#000000", // Header text color
        colorTextSider: "#000000",  // Sidebar text color
      },
    }
  };

  return (
    <html lang="en">
      <body
        //  className={inter.className}
        className={lato.className}  // Apply Lato globally
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          fontFamily: `${lato.style.fontFamily}, sans-serif`  // Ensure sans-serif as fallback
        }}

      >
        <ConfigProvider theme={customTheme} componentSize="middle">
          <StoreProvider>
            <ProtectedPage>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </ProtectedPage>
          </StoreProvider>
        </ConfigProvider>
      </body>
    </html >
  );
}
