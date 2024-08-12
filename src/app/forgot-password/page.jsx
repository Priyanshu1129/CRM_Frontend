"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";
import { Button,  Form, Input, Flex, theme } from "antd";
const ForgotPassword = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

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
        name="forgotPassword"
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
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Send reset instructions
          </Button>
        </Form.Item>
        <Form.Item>
          <Flex justify="center" align="center">
            <a href="/login">Sign in</a>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ForgotPassword;
