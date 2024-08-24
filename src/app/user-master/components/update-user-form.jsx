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
import moment from "moment";
import { ImageUpload } from "@/components";
import { userFormRules } from "@/utilities/formValidationRules";
import { updateUser } from "@/redux/actions/userAction";
import { userActions } from "@/redux/slices/userSlice";
import { getChangedValues } from "@/utilities/getChangedValues";

export const UpdateUserForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.user.updateUser);

  const initialValues = useRef({});
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      const userInitialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        role: user.role,
        phone: user.phone,
        email: user.email,
        address: user.address,
        avatar: user.avatar,
      };
      form.setFieldsValue(userInitialValues);
      initialValues.current = userInitialValues;
    }
  }, [user, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "User updated successfully.",
      });
      dispatch(userActions.clearUpdateUserStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update user.",
      });
      dispatch(userActions.clearUpdateUserStatus());
      dispatch(userActions.clearUpdateUserError());
    }
  }, [status, error, dispatch]);
  const handleAvatarChange = (fileList) => {
    if (fileList.length > 0) {
      const newAvatar = fileList[0].originFileObj || fileList[0].url;
      setAvatarChanged(true);
      setAvatar(newAvatar);
    } else {
      setAvatarChanged(false);
      setAvatar(null);
    }
  };

  const onFinish = (values) => {
    setLoading(true);

    // Compare current values with initial values and get only changed values

    const changedValues = getChangedValues(initialValues, values);

    if (avatarChanged) {
      changedValues.avatar = avatar;
    }

    console.log("Changed values:", changedValues);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      dispatch(updateUser(changedValues, user._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  const roles = [
    { label: "Viewer", value: "viewer" },
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="default">
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Upload User Profile" name="profileImage">
            <ImageUpload
              initialImage={user?.avatar}
              onAvatarChange={handleAvatarChange}
            />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={userFormRules.firstName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={userFormRules.lastName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Gender" name="gender" rules={userFormRules.gender}>
            <Select>
              <Select.Option value="M">Male</Select.Option>
              <Select.Option value="F">Female</Select.Option>
              <Select.Option value="O">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Role" name="role" rules={userFormRules.role}>
            <Select>
              {roles.map(({ label, value }, idx) => (
                <Select.Option key={idx} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Phone" name="phone" rules={userFormRules.phone}>
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Email" name="email" rules={userFormRules.email}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            label="Address"
            name="address"
            rules={userFormRules.address}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Space>
              <Button
                // disabled
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Update
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={() => form.resetFields()}
                loading={loading}
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
