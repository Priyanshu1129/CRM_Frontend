"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from 'antd';
import PrivateLayout from '@/components/layout/Layout';
const NoLayout = ({ children }) => (
    <Layout
        style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        }}
    >{children}</Layout>
);

const publicRoutes = ['/login', '/register', '/forgot-password', '/forgot-password/input-otp'];

export const ProtectedPage = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const router = useRouter();
    const currentPath = usePathname();

    useEffect(() => {
        // Check authentication status on client side
        const authStatus = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(authStatus);

        // Redirect if not authenticated and trying to access a protected route
        if (authStatus === 'true' && publicRoutes.includes(currentPath)) {
            router.push('/dashboard'); // Redirect authenticated users to dashboard
        } else if (authStatus !== 'true' && !publicRoutes.includes(currentPath)) {
            router.push('/login'); // Redirect unauthenticated users to login
        }
    }, [currentPath, router]);

    const isPublicRoute = publicRoutes.includes(currentPath);
    console.log('currentPath2', currentPath);

    const Wrapper = isPublicRoute ? NoLayout : PrivateLayout;

    return (isAuthenticated === 'true' || isPublicRoute) ? (
        <AntdRegistry>
            <Wrapper>
                {children}
            </Wrapper>
        </AntdRegistry>
    ) : null;
};
