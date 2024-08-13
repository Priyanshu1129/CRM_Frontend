import { Inter } from "next/font/google";
import { ConfigProvider } from 'antd';
import Layout from "@/components/layout";
import { themeConfig } from "@/config";
import "./globals.css"
import { FullScreenLoading } from "@/components";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider>
          <Layout>
            {children}
            {/* <FullScreenLoading /> */}
          </Layout>
        </ConfigProvider>
      </body>
    </html >
  );
}
