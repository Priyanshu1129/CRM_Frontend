"use client";
import React, { useState } from "react";
import { Button, Form, Input, Flex } from "antd";
import { useVerifyOTP } from "@/hooks/auth/useVerifyOTP.js";
import NewPasswordForm from "../new-password/index.jsx";

const InputOTP = ({ inputEmail }) => {
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const { loading, verifyOTP } = useVerifyOTP(setIsOTPVerified, inputEmail);

  const onFinish = (values) => {
    verifyOTP(values);
    console.log("Form Data Sent to Hook:", values);
  };

  return (
    <div>
      {!isOTPVerified ? (
        <Form name="otpForm" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="otp"
            label="Enter OTP"
            rules={[{ required: true, message: "Please enter the OTP!" }]}
          >
            <Input
              placeholder="6-digit OTP"
              maxLength={6}
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 6);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <NewPasswordForm inputEmail={inputEmail} />
      )}
    </div>
  );
};

export default InputOTP;
