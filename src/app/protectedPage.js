"use client";
import { useEffect } from "react";
import { hasRoutePermission } from "@/utilities/checkPermission";
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
  const { checked, status, data, permissions } = useSelector(
    (state) => state.auth.authDetails
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();
  const isPublicRoute = publicRoutes.includes(currentPath);

  useEffect(() => {
    setRouter(router); // Setup global router
  }, [router]);

  useEffect(() => {
    if (!checked) {
      dispatch(checkAuth()); // Trigger authentication check
    }
  }, [checked, dispatch]);

  if (!checked || status === "pending") {
    return <NoLayout>Loading...</NoLayout>;
  }

  if (data) {
    // User is authenticated
    if (isPublicRoute) {
      router.replace("/"); // Redirect to home if authenticated and accessing a public route
      return <NoLayout>Redirecting...</NoLayout>;
    }

    if (
      data.role?.name === "SUPER ADMIN" ||
      currentPath === "/unauthorized" ||
      hasRoutePermission(permissions, currentPath)
    ) {
      // Render protected content
      const Wrapper = PrivateLayout;
      return <Wrapper>{children}</Wrapper>;
    } else {
      // Redirect unauthorized access
      router.replace("/unauthorized");
      return <NoLayout>Redirecting...</NoLayout>;
    }
  } else {
    // User not authenticated
    if (isPublicRoute) {
      return <NoLayout>{children}</NoLayout>; // Render public route
    } else {
      router.replace("/login"); // Redirect to login
      return <NoLayout>Redirecting...</NoLayout>;
    }
  }
};

// "use client";
// import { useEffect, useState } from "react";
// import { hasRoutePermission } from "@/utilities/checkPermission";
// import { useRouter, usePathname } from "next/navigation";
// import { Layout } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import PrivateLayout from "@/components/layout/Layout";
// import { checkAuth } from "@/redux/actions/authAction";
// import { setRouter } from "@/utilities/globalRouter";

// const NoLayout = ({ children }) => (
//   <Layout
//     style={{
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     {children}
//   </Layout>
// );

// const publicRoutes = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/forgot-password/input-otp",
// ];

// export const ProtectedPage = ({ children }) => {
//   const { checked, status, data, error, permissions } = useSelector(
//     (state) => state.auth.authDetails
//   );
//   const [readyToRender, setReadyToRender] = useState(false);

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const currentPath = usePathname();
//   const isPublicRoute = publicRoutes.includes(currentPath);

//   useEffect(() => {
//     setRouter(router);
//   }, [router]);

//   useEffect(() => {
//     if (!checked) {
//       dispatch(checkAuth());
//     }
//   }, [checked, dispatch]);

//   useEffect(() => {
//     if (checked) {
//       if (data) {
//         isPublicRoute ? handlePublicRoute() : handleProtectedRoute();
//       } else {
//         isPublicRoute ? setReadyToRender(true) : router.replace("/login");
//       }
//     }
//   }, [checked, data, permissions, currentPath]);

//   const handlePublicRoute = () => {
//     router.replace("/");
//   };

//   const handleProtectedRoute = () => {
//     if (data?.role?.name === "SUPER ADMIN") {
//       setReadyToRender(true);
//     } else if (
//       currentPath === "/unauthorized" ||
//       hasRoutePermission(permissions, currentPath)
//     ) {
//       setReadyToRender(true);
//     } else {
//       router.replace("/unauthorized");
//     }
//   };

//   if (!checked || !readyToRender || status === "pending") {
//     return <NoLayout>Loading...</NoLayout>;
//   }
//   // console.log()
//   const Wrapper = isPublicRoute ? NoLayout : PrivateLayout;

//   return readyToRender && <Wrapper>{children}</Wrapper>;
// };
