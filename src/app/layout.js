import { Inter } from "next/font/google";
import { ConfigProvider } from 'antd';
import Layout from "@/components/layout";
import ErrorBoundary from "./ErrorBoundary";
import "./globals.css"
import { StoreProvider } from "./storeProvider";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider>
          <StoreProvider>
            <ErrorBoundary>
              <Layout>
                {children}
              </Layout>
            </ErrorBoundary>
          </StoreProvider>
        </ConfigProvider>
      </body>
    </html >
  );
}
