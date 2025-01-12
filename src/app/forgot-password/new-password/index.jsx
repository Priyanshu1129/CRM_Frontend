"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useSetNewPassword } from "@/hooks/auth/useNewPassword";

const NewPasswordForm = ({ inputEmail }) => {
  const { loading, onFinish } = useSetNewPassword(inputEmail);

  return (
    <Form name="newPasswordForm" layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[{ required: true, message: "Please enter your new password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item
        name="confirmNewPassword"
        label="Confirm Password"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
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
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewPasswordForm;
