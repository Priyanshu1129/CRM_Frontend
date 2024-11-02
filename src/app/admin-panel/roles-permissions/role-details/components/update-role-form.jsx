"use client";
import React from "react";
import { Button, Form, Input, Space, Grid, Row, Col } from "antd";
import { roleFormRules } from "@/utilities/formValidationRules";
import { useUpdateRole } from "@/hooks/adminPanel/roles-Permissions";

export const UpdateRoleForm = ({ role }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const { loading, onFinish } = useUpdateRole({ role, form });

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      // size="default"
    >
      <Row gutter={24}>
        <Col span={colSpan}>
          <Form.Item
            label="Name"
            name="roleName"
            rules={roleFormRules.roleName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Change Name
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={() => form.resetFields()}
                disabled={loading}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
