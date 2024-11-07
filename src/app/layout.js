"use client"
import { Inter, Lato } from "next/font/google";
import { ConfigProvider } from 'antd';
import { ProtectedPage } from "./protectedPage";
import ErrorBoundary from "./ErrorBoundary";
import "./globals.css"
import { customTheme } from "@/config";
import { StoreProvider } from "./storeProvider";
const inter = Inter({ subsets: ["latin"] });
// const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
         className={inter.className}
        // className={lato.className}  // Apply Lato globally
        // style={{
        //   WebkitFontSmoothing: "antialiased",
        //   MozOsxFontSmoothing: "grayscale",
        //   fontFamily: `${lato.style.fontFamily}, sans-serif`  // Ensure sans-serif as fallback
        // }}

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
