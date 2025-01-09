"use client";
import React from "react";
import { Button, Form, Input, Flex } from "antd";
const ChangePassword = () => {
  const [form] = Form.useForm();

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "32px",
        width: 360,
        borderRadius: "8px",
        margin: "auto",
        border: 1,
      }}
    >
      <Form
        form={form}
        name="dependencies"
        autoComplete="off"
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Field */}
        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
        <Form.Item>
          <Flex justify="center" align="center">
            <a href="/login">Cancel</a>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ChangePassword;
