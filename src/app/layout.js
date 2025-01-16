"use client";
import { Roboto, Poppins } from "next/font/google";
import { ConfigProvider } from "antd";
import { ProtectedPage } from "./protectedPage";
import ErrorBoundary from "./ErrorBoundary";
import "./globals.css";
import { customTheme } from "@/config";
import { StoreProvider } from "./storeProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });
import "../config/config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConfigProvider theme={customTheme} componentSize="middle">
          <StoreProvider>
            <AntdRegistry>
              <ProtectedPage>
                <ErrorBoundary>{children}</ErrorBoundary>
              </ProtectedPage>
            </AntdRegistry>
          </StoreProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
