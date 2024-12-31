"use client";
import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Grid,
  theme,
  Row,
  Col,
  notification,
} from "antd";
import { FormHeader } from "@/components";
import { roleFormRules } from "@/utilities/formValidationRules";
import { useAddRole } from "@/hooks/adminPanel/roles-Permissions";

const AddRole = () => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, onFinish } = useAddRole();

  return (
    <>
      <FormHeader backButtonText={"Return"} />
      <Space
        direction="vertical"
        style={{
          marginTop: "24px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: !screens.xs ? "32px" : "16px",
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          // size={"default"}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Role Name"
                name="roleName"
                rules={roleFormRules.roleName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
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
      </Space>
    </>
  );
};

export default AddRole;
