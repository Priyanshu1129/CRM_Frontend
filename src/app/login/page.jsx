"use client";
import React, { use, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, theme, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/actions/authAction";
import { authActions } from "@/redux/slices/authSlice";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Login = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.auth.login);
  // const { status: logoutSuccess, error: logoutError } = useSelector(
  //   (state) => state.auth.logout
  // );

  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   // Check if the 'logout' query parameter is present
  //   const logoutStatus = searchParams.get("logout");

  //   if (logoutStatus === "success") {
  //     // Show success notification
  //     notification.success({
  //       message: "Success",
  //       description: "Logged out successfully.",
  //     });
  //     dispatch(authActions.clearLogoutStatus()); // Remove the query parameter from the URL
  //     const currentPath = usePathname();
  //     router.push(currentPath); // Navigate to the same page without query parameters
  //   }
  // }, [searchParams, router]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      dispatch(authActions.checkAuthSuccess(data));
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Incorrect Credentials!",
      });
      dispatch(authActions.clearAuthDetailsStatus());
      dispatch(authActions.clearAuthDetailsError());
    }
  }, [status, error, dispatch, router]);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "32px",
        width: 360,
        borderRadius: borderRadiusLG,
        margin: "auto",
        border: 1,
      }}
    >
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{}}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/forgot-password">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
