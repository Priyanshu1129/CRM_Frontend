"use client";
import React, { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, theme, notification } from "antd";
import { useChangePassword } from "@/hooks/auth";

const ChangePassword = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, handleSubmit } = useChangePassword();

  const onFinish = (data) => {
    handleSubmit(data);
    console.log("Form Data Sent to Hook:", data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Full viewport height
        background: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          width: 360,
          borderRadius: borderRadiusLG,
          border: "1px solid #e8e8e8",
        }}
      >
        <Form name="change-password" onFinish={onFinish} style={{}}>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Old Password"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm New Password"
            />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} block type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
