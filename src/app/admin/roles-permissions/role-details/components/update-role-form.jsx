"use client";
import React from "react";
import { Button, Form, Input, Space, Grid, Row, Col } from "antd";
import { roleFormRules } from "@/utilities/formValidationRules";
import { useUpdateRole } from "@/hooks/adminPanel/roles-Permissions";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";

export const UpdateRoleForm = ({ role }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const canUpdateRole = useCheckPermission("/admin/roles-permissions/update");

  const { loading, onFinish } = useUpdateRole({ role, form });

  const colSpan = screens.xs ? 24 : screens.sm ? 8 : screens.md ? 8 : 8;

  return (
    <Form
      disabled={!canUpdateRole}
      form={form}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={6} style={{ paddingLeft: 0 }}>
          <Form.Item
            label="Role Name"
            name="roleName"
            rules={roleFormRules.roleName}
            getValueFromEvent={(e) => e.target.value.toUpperCase()}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18} style={{ display: "flex", alignItems: "flex-end" }}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Change Name
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={() => form.resetFields()}
                disabled={loading || !canUpdateRole}
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
