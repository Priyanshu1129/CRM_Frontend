"use client";
import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col,
  Grid,
  theme,
} from "antd";
import { FormHeader, ImageUpload, InputPhoneNumber } from "@/components";
import { useAddUser } from "@/hooks/user";
import { useFetchAllRoles } from "@/hooks/adminPanel/roles-Permissions";
import { userFormRules } from "@/utilities/formValidationRules";

const AddUser = () => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    handleAvatarChange,
    onFinish,
    loading,
    phoneCountryCode,
    setPhoneCountryCode,
  } = useAddUser();
  const { loading: rolesLoading, roles = [] } = useFetchAllRoles();

  return (
    <>
      <FormHeader backButtonText={"Return"} />
      <Space
        direction="vertical"
        style={{
          marginTop: "28px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: !screens.xs ? "32px" : "16px",
        }}
      >
        <Form
          initialValues={{}}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          // size={"default"}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Upload Client Profile">
                <ImageUpload onAvatarChange={handleAvatarChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={userFormRules.firstName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={userFormRules.lastName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={userFormRules.gender}
              >
                <Select>
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                  <Select.Option value="O">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
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
            <Col span={8}>
              <InputPhoneNumber
                name="phone"
                label="Phone Number"
                rules={userFormRules.phone}
                phoneCountryCode={phoneCountryCode}
                setPhoneCountryCode={setPhoneCountryCode}
              />
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email" rules={userFormRules.email}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Country"
                name="country"
                rules={userFormRules.country}
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

export default AddUser;
