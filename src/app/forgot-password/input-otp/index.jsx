"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Flex, Input, theme, notification, Modal } from "antd";
import { authActions } from "@/redux/slices/authSlice";
import { resetPasswordWithOTP } from "@/redux/actions/authAction";
import { MessageModal } from "@/components/modal";
const InputOTP = ({ inputEmail }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { status, error } = useSelector((state) => state.auth.verifyOTP);
  const router = useRouter();

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setIsModalOpen(true);
      dispatch(authActions.clearVerifyOTPStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Invalid OTP",
      });
      dispatch(authActions.clearVerifyOTPStatus());
      dispatch(authActions.clearVerifyOTPError());
    }
  }, [status, error, dispatch, router]);

  const onFinish = (values) => {
    values = {
      ...values,
      email: inputEmail,
    };
    console.log("Received values of form: ", values);
    dispatch(resetPasswordWithOTP(values));
  };

  return (
    <>
      <Form name="forgotPassword" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="otp"
          label="Enter OTP"
          rules={[
            {
              required: true,
              message: "Please enter OTP!",
            },
          ]}
        >
          <Input.OTP length={6} placeholder="OTP" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item
          name="newPasswordConfirmation"
          label="Confirm Password"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
        <Flex justify="center" align="center">
          <a href="/login">Sign in</a>
        </Flex>
      </Form>
      <MessageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        message={"Password Updated Successfully"}
      />
    </>
  );
};

export default InputOTP;
