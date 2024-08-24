"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, theme, notification } from "antd";
import { forgotPassword, verifyOTP } from "@/redux/actions/authAction";
import { authActions } from "@/redux/slices/authSlice";
import InputOTP from "./input-otp";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [emailVerified, setEmailVerified] = useState(false);
  const [inputEmail, setInputEmail] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { status, error } = useSelector((state) => state.auth.authDetails);
  const router = useRouter();

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setEmailVerified(true);
      dispatch(authActions.clearAuthDetailsStatus());
    } else if (status === "failed") {
      setLoading(false);
      setEmailVerified(false);
      setInputEmail(null);
      notification.error({
        message: "Error",
        description: error || "Email or Password is wrong",
      });
      dispatch(authActions.clearAuthDetailsStatus());
      dispatch(authActions.clearAuthDetailsError());
    }
  }, [status, error, dispatch, router]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setInputEmail(values.email);
    dispatch(forgotPassword(values));
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
      {!emailVerified ? (
        <Form
          name="forgotPassword"
          layout="vertical"
          style={{}}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit">
              Send OTP
            </Button>
          </Form.Item>
          <Flex justify="center" align="center">
            <a href="/login">Sign in</a>
          </Flex>
        </Form>
      ) : (
        <InputOTP inputEmail={inputEmail} />
      )}
    </div>
  );
};
export default ForgotPassword;
