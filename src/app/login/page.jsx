// import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";

// import { Title } from "@/components";
// import { demoCredentials } from "@/providers";

// export const LoginPage = () => {
//   const [searchParams] = useSearchParams();

//   const emailFromSearchParams = searchParams.get("email");
//   const accessToken = searchParams.get("accessToken");
//   const refreshToken = searchParams.get("refreshToken");

//   const initialValues = emailFromSearchParams
//     ? { email: emailFromSearchParams }
//     : demoCredentials;

//   useEffect(() => {
//     if (accessToken && refreshToken) {

//     }
//   }, [accessToken, refreshToken]);

//   return (
//     <AuthPage
//       type="login"
//       formProps={{
//         initialValues,
//       }}
//       contentProps={{
//         className: "auth-page",
//       }}
//       title={<Title collapsed={false} />}
//       providers={[
//         {
//           name: "google",
//           label: "Sign in with Google",
//           icon: (
//             // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
//             <GoogleOutlined
//               style={{
//                 fontSize: 24,
//                 lineHeight: 0,
//               }}
//             />
//           ),
//         },
//         {
//           name: "github",
//           label: "Sign in with GitHub",
//           icon: (
//             // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
//             <GithubOutlined
//               style={{
//                 fontSize: 24,
//                 lineHeight: 0,
//               }}
//             />
//           ),
//         },
//       ]}
//     />
//   );
// };
"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, theme } from "antd";
const Login = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "32px",
        maxWidth: 400,
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
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
          <Input
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
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Any link</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
