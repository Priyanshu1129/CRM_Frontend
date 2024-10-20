"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  DatePicker,
  notification,
} from "antd";
import { roleFormRules } from "@/utilities/formValidationRules";
import {
  updateRole,
  editRolePermissions,
  getAllRoles,
} from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { getChangedValues } from "@/utilities/getChangedValues";

export const UpdateRoleForm = ({ role }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.role.updateRole);

  const initialValues = useRef({});
  useEffect(() => {
    if (role) {
      const roleInitialValues = {
        roleName: role.name,
      };
      form.setFieldsValue(roleInitialValues);
      initialValues.current = roleInitialValues;
    }
  }, [role, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Role name updated successfully.",
      });
      dispatch(getAllRoles({}));
      dispatch(roleActions.clearUpdateRoleStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update role name.",
      });
      dispatch(roleActions.clearUpdateRoleStatus());
      dispatch(roleActions.clearUpdateRoleError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);

    const changedValues = getChangedValues(initialValues, values);

    console.log("Changed values:", changedValues);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      dispatch(updateRole(changedValues, role._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="default">
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
