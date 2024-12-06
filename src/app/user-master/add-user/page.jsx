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
  Divider,
} from "antd";
import {
  FormHeader,
  ImageUpload,
  InputPhoneNumber,
  SolutionSelector,
  IndustrySelector,
  TerritorySelector,
  Text,
} from "@/components";
import { useAddUser } from "@/hooks/user";
import { useFetchAllRoles } from "@/hooks/adminPanel/roles-Permissions";
import { userFormRules } from "@/utilities/formValidationRules";
import { colorConfig } from "@/config";

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

  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 8, // 3 fields per row on desktops
    lg: 6,
  };

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
          <Row>
            <Col {...colSpan}>
              <Form.Item label="Upload Member Profile">
                <ImageUpload onAvatarChange={handleAvatarChange} />
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
                rules={userFormRules.country}
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
            <Col xs={24} sm={12} md={8} lg={6}>
              <SolutionSelector
                multiple={true}
                name="solution"
                label="Solution"
                // rules={opportunityFormRules.solution}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <IndustrySelector
                multiple={true}
                label="Industry"
                name="industry"
                // rules={clientFormRules.industry}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
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
            <Col {...colSpan}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
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
