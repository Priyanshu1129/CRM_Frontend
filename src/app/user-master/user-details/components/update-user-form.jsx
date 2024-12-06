"use client";
import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Divider,
  Space,
  Grid,
  Row,
  Col,
} from "antd";
import {
  ImageUpload,
  InputPhoneNumber,
  IndustrySelector,
  TerritorySelector,
  SolutionSelector,
  Text,
} from "@/components";
import { userFormRules } from "@/utilities/formValidationRules";
import { useUpdateUser } from "@/hooks/user";
import { useFetchAllRoles } from "@/hooks/adminPanel/roles-Permissions";
import { colorConfig } from "@/config";

export const UpdateUserForm = ({ user }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const { loading: rolesLoading, roles = [] } = useFetchAllRoles();

  const {
    handleUpdateUser,
    loading,
    setAvatar,
    setAvatarChanged,
    phoneCountryCode,
    setPhoneCountryCode,
  } = useUpdateUser({ user, form });

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

  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 8, // 3 fields per row on desktops
    lg: 6,
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      // size="default"
    >
      <Row>
        <Col span={24}>
          <Form.Item label="Upload User Profile" name="profileImage">
            <ImageUpload
              initialImage={user?.avatar}
              onAvatarChange={handleAvatarChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Personal Information
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col {...colSpan}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={userFormRules.firstName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={userFormRules.lastName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Gender" name="gender" rules={userFormRules.gender}>
            <Select>
              <Select.Option value="M">Male</Select.Option>
              <Select.Option value="F">Female</Select.Option>
              <Select.Option value="O">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Section: Location & Legal Information */}
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Contact Information
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col {...colSpan}>
          <InputPhoneNumber
            name="phone"
            label="Phone Number"
            rules={userFormRules.phone}
            phoneCountryCode={phoneCountryCode}
            setPhoneCountryCode={setPhoneCountryCode}
          />
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Email" name="email" rules={userFormRules.email}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Section: Location & Legal Information */}
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Address Information
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col {...colSpan}>
          <Form.Item
            label="Country"
            name="country"
            rules={userFormRules.address}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="State" name="state" rules={userFormRules.state}>
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="City" name="city" rules={userFormRules.city}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Section: Location & Legal Information */}
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Role & SIT
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col {...colSpan}>
          <Form.Item label="Role" name="role" rules={userFormRules.role}>
            <Select loading={rolesLoading}>
              {roles.map(({ name, _id }, idx) => (
                <Select.Option key={idx} value={_id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <SolutionSelector
            multiple={true}
            name="solution"
            label="Solution"
            // rules={opportunityFormRules.solution}
          />
        </Col>
        <Col {...colSpan}>
          <IndustrySelector
            multiple={true}
            label="Industry"
            name="industry"
            // rules={clientFormRules.industry}
          />
        </Col>
        <Col {...colSpan}>
          <TerritorySelector
            multiple={true}
            label="Territory"
            name="territory"
            // rules={clientFormRules.territory}
          />
        </Col>
      </Row>

      {/* Section: Actions */}
      <Row gutter={24}>
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
