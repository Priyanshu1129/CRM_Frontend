"use client";
import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, theme } from "antd";
import { useforgotPassword } from "@/hooks/auth";
import InputOTP from "./input-otp";

const ForgotPassword = () => {
  const [inputEmail, setInputEmail] = useState(null);
  const { emailVerified, loading, handleSendOtp } =
    useforgotPassword(setInputEmail);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values) => {
    setInputEmail(values.email);
    handleSendOtp(values.email);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "32px",
        width: 360,
        borderRadius: borderRadiusLG,
        margin: "auto",
        border: "1px solid #ddd",
      }}
    >
      {!emailVerified ? (
        <Form name="forgotPassword" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Flex justify="space-between" align="center">
            <Button type="primary" loading={loading} htmlType="submit">
              Send OTP
            </Button>
            {/* <Button
              type="link"
              loading={loading}
              htmlType="submit"
              style={{ fontSize: "12px", padding: 0 }}
            >
              Resend OTP
            </Button> */}
          </Flex>
        </Form>
      ) : (
        <InputOTP inputEmail={inputEmail} />
      )}
    </div>
  );
};

export default ForgotPassword;
