"use client";
import { Roboto } from "next/font/google";
import { ConfigProvider } from 'antd';
import { ProtectedPage } from "./protectedPage";
import ErrorBoundary from "./ErrorBoundary";
import "./globals.css";
import { customTheme } from "@/config";
import { StoreProvider } from "./storeProvider";
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={roboto.className}>
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
