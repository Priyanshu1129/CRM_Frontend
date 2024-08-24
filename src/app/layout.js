import { Inter } from "next/font/google";
import { ConfigProvider } from 'antd';
import { ProtectedPage } from "./protectedPage";
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
