"use client";
import { useEffect, useState } from "react";
import { hasRoutePermission } from "@/utilities/checkRoutePermission";
import { useRouter, usePathname } from "next/navigation";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PrivateLayout from "@/components/layout/Layout";
import { checkAuth } from "@/redux/actions/authAction";
import { setRouter } from "@/utilities/globalRouter";

const NoLayout = ({ children }) => (
  <Layout
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </Layout>
);

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/forgot-password/input-otp",
];

export const ProtectedPage = ({ children }) => {
  const { checked, status, data, error, permissions } = useSelector(
    (state) => state.auth.authDetails
  );
  const [readyToRender, setReadyToRender] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();
  const isPublicRoute = publicRoutes.includes(currentPath);

  useEffect(() => {
    setRouter(router);
  }, [router]);

  useEffect(() => {
    if (!checked) {
      dispatch(checkAuth());
    }
  }, [checked, dispatch]);

  useEffect(() => {
    if (checked) {
      if (data) {
        isPublicRoute ? handlePublicRoute() : handleProtectedRoute();
      } else {
        isPublicRoute ? setReadyToRender(true) : router.replace("/login");
      }
    }
  }, [checked, data, permissions, currentPath]);

  const handlePublicRoute = () => {
    router.replace("/");
  };

  const handleProtectedRoute = () => {
    if (data.role.name === "SUPER ADMIN") {
      setReadyToRender(true);
    } else if (
      currentPath === "/unauthorized" ||
      hasRoutePermission(permissions, currentPath)
    ) {
      setReadyToRender(true);
    } else {
      router.replace("/unauthorized");
    }
  };

  if (!checked || !readyToRender || status === "pending") {
    return <NoLayout>Loading...</NoLayout>;
  }

  const Wrapper = isPublicRoute ? NoLayout : PrivateLayout;

  return readyToRender && <Wrapper>{children}</Wrapper>;
};

// [
//   {
//     entity: {
//       roleId: null,
//       _id: "6776c442ef2a4133f2717a4a",
//       entity: "AUTHENTICATION",
//       actions: ["SIGNUP", "CHANGE PASSWORD"],
//       label: "AUTHENTICATION",
//       __v: 0,
//       createdAt: "2025-01-02T16:52:18.370Z",
//       updatedAt: "2025-01-02T16:52:18.370Z",
//     },
//     allowedActions: ["SIGNUP"],
//     _id: "6776c78f5d57a26b7b3ef009",
//   },
//   {
//     entity: {
//       _id: "6776d13f22038bb513a0ef40",
//       entity: "ACCOUNTANT",
//       actions: ["CREATE", "READ", "UPDATE", "DELETE", "GET ALL"],
//       roleId: "6776d13f22038bb513a0ef3e",
//       label: "ACCOUNTANT",
//       createdAt: "2025-01-02T17:47:43.813Z",
//       updatedAt: "2025-01-02T17:47:43.813Z",
//       __v: 0,
//     },
//     allowedActions: ["READ", "CREATE", "GET ALL"],
//     _id: "6776da956df6135eeacf2c37",
//   },
//   {
//     entity: {
//       roleId: null,
//       _id: "6776c442ef2a4133f2717a4d",
//       entity: "BUSINESS DEVELOPMENT",
//       actions: ["CREATE", "READ", "UPDATE", "DELETE", "GET ALL"],
//       label: "MENTION",
//       __v: 0,
//       createdAt: "2025-01-02T16:52:18.370Z",
//       updatedAt: "2025-01-02T16:52:18.370Z",
//     },
//     allowedActions: ["GET ALL"],
//     _id: "6776daed6df6135eeacf2c9c",
//   },
//   {
//     entity: {
//       roleId: null,
//       _id: "6776c442ef2a4133f2717a53",
//       entity: "ROLE",
//       actions: ["CREATE", "READ", "UPDATE", "DELETE", "GET ALL"],
//       label: "ROLE",
//       __v: 0,
//       createdAt: "2025-01-02T16:52:18.371Z",
//       updatedAt: "2025-01-02T16:52:18.371Z",
//     },
//     allowedActions: ["CREATE", "READ", "UPDATE", "DELETE", "GET ALL"],
//     _id: "67781d1dc45425c8a9d0a6fd",
//   },
//   {
//     entity: {
//       _id: "6777ea0494592395e4de7a4a",
//       roleId: "671a4e59cb71d4df097ddc02",
//       __v: 0,
//       actions: ["CREATE", "READ", "UPDATE", "DELETE", "GET ALL"],
//       createdAt: "2025-01-03T13:45:39.808Z",
//       entity: "USER",
//       label: "USER",
//       updatedAt: "2025-01-03T13:51:05.119Z",
//     },
//     allowedActions: ["GET ALL", "READ", "UPDATE"],
//     _id: "6778fdd8217d1941c606e168",
//   },
//   {
//     entity: {
//       _id: "6777eb9b94592395e4de7a4d",
//       roleId: "671fb1b0995879f20ca6eca3",
//       __v: 0,
//       actions: ["CREATE", "READ", "UPDATE", "DELETE", "GET ALL"],
//       createdAt: "2025-01-03T13:52:27.252Z",
//       entity: "VIEWER",
//       label: "VIEWER",
//       updatedAt: "2025-01-03T13:52:27.252Z",
//     },
//     allowedActions: ["CREATE", "GET ALL"],
//     _id: "677904239eababf9e638f6f5",
//   },
//   {
//     entity: {
//       _id: "6777eb8c94592395e4de7a4c",
//       roleId: "671fa508d9249aa83debb263",
//       __v: 0,
//       actions: ["CREATE", "READ", "UPDATE", "DELETE", "GET ALL"],
//       createdAt: "2025-01-03T13:52:12.472Z",
//       entity: "SALESCHAMP",
//       label: "SALESCHAMP",
//       updatedAt: "2025-01-03T13:52:12.472Z",
//     },
//     allowedActions: ["CREATE", "UPDATE"],
//     _id: "677905c89eababf9e638f84d",
//   },
//   {
//     entity: {
//       roleId: null,
//       _id: "6776c442ef2a4133f2717a54",
//       entity: "PIPE VIEW",
//       actions: ["MY VIEW", "ALL VIEW"],
//       label: "PIPE VIEW",
//       __v: 0,
//       createdAt: "2025-01-02T16:52:18.371Z",
//       updatedAt: "2025-01-02T16:52:18.371Z",
//     },
//     allowedActions: ["MY VIEW"],
//     _id: "6779183465774b0c91b068dc",
//   },
//   {
//     entity: {
//       roleId: null,
//       _id: "6776c442ef2a4133f2717a55",
//       entity: "FUNNEL VIEW",
//       actions: ["MY VIEW", "ALL VIEW"],
//       label: "FUNNEL VIEW",
//       __v: 0,
//       createdAt: "2025-01-02T16:52:18.371Z",
//       updatedAt: "2025-01-02T16:52:18.371Z",
//     },
//     allowedActions: ["ALL VIEW"],
//     _id: "6779183465774b0c91b068de",
//   },
// ];
