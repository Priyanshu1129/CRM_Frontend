"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
  const { checked, status, data, error } = useSelector(
    (state) => state.auth.authDetails
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setRouter(router);
  }, [router]);

  const currentPath = usePathname();
  const isPublicRoute = publicRoutes.includes(currentPath);

  useEffect(() => {
    if (checked && data && isPublicRoute) {
      router.replace("/");
    }
  }, [data, status, isPublicRoute, router, checked]);

  useEffect(() => {
    if (!checked && data === null && status === "idle") {
      dispatch(checkAuth());
    }
  }, [status, data, dispatch, checked]);

  if (!checked || status === "pending") {
    return (
      <AntdRegistry>
        <NoLayout>Loading...</NoLayout>
      </AntdRegistry>
    );
  }

  const Wrapper = isPublicRoute ? NoLayout : PrivateLayout;

  return checked && (data || isPublicRoute) ? (
    <AntdRegistry>
      <Wrapper>{children}</Wrapper>
    </AntdRegistry>
  ) : null;
};

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { Layout } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import PrivateLayout from "@/components/layout/Layout";
// import { checkAuth } from "@/redux/actions/authAction";
// import { isTokenExpired } from "@/utilities/checkTokenExpiry";
// import { logout } from "@/redux/actions/authAction"; // Logout action
// import { authActions } from "@/redux/slices/authSlice";
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
//   const { status, data, error } = useSelector(
//     (state) => state.auth.authDetails
//   );
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const currentPath = usePathname();
//   const isPublicRoute = publicRoutes.includes(currentPath);

//   function decision() {
//     console.log("entry in desicioin");
//     const tokenExpired = isTokenExpired(isPublicRoute);

//     if (isPublicRoute) {
//       if (tokenExpired) {
//         dispatch(authActions.resetAuthState());
//       } else {
//         if (data) {
//           router.push("/cockpit"); // Redirect authenticated users to dashboard
//         } else if (status !== "pending") {
//           dispatch(checkAuth());
//         }
//       }
//     } else {
//       if (tokenExpired) {
//         dispatch(logout());
//         router.push("/login"); // Redirect un-authenticated users to login page
//       } else {
//         if (!data && status !== "pending") {
//           dispatch(checkAuth());
//         }
//       }
//     }
//   }

//   useEffect(() => {
//     decision();
//     const interval = setInterval(() => {
//       decision(); // Check token expiry and perform actions
//     }, 1 * 60 * 1000); // Check every 5 minutes

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [status, data, dispatch]);

//   if (status === "pending") {
//     return (
//       <AntdRegistry>
//         <NoLayout>Loading...</NoLayout>
//       </AntdRegistry>
//     );
//   }

//   const Wrapper = isPublicRoute ? NoLayout : PrivateLayout;

//   return data || isPublicRoute ? (
//     <AntdRegistry>
//       <Wrapper>{children}</Wrapper>
//     </AntdRegistry>
//   ) : null;
// };
