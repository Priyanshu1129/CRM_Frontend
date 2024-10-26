"use client";
import React from "react";
import { Button, Form, Input, Select, Space, Grid, Row, Col } from "antd";
import { ImageUpload, InputPhoneNumber } from "@/components";
import { userFormRules } from "@/utilities/formValidationRules";
import { useUpdateUser } from "@/hooks/user";

export const UpdateUserForm = ({ user }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const { handleUpdateUser, loading, setAvatar, setAvatarChanged, phoneCountryCode, setPhoneCountryCode } =
    useUpdateUser({ user, form });

  const onFinish = (values) => {
    const updatedValues = {
      ...values,
      phone: `${phoneCountryCode} ${values.phone}`,
    };
    handleUpdateUser(updatedValues);
  };

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
          <InputPhoneNumber
            name="phone"
            label="Phone Number"
            rules={userFormRules.phone}
            phoneCountryCode={phoneCountryCode}
            setPhoneCountryCode={setPhoneCountryCode}
          />
        </Col>
        <Col span={colSpan}>
          <Form.Item label="Email" name="email" rules={userFormRules.email}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Country"
            name="country"
            rules={userFormRules.address}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="State" name="state" rules={userFormRules.state}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="City" name="city" rules={userFormRules.city}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update
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
