"use client";
import { DatePicker } from "antd";
import React, { useState } from "react";
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
  Divider,
} from "antd";
import {
  ClassificationsSelector,
  IncorporationTypesSelector,
  RelationshipStatusSelector,
  MarketCapSelector,
} from "../enums";
import {
  FormHeader,
  SubIndustrySelector,
  IndustrySelector,
  TerritorySelector,
  UserSelector,
  ContactSelector,
  ImageUpload,
  BulkUploadModal,
  CurrencyAmountInput,
} from "@/components";
import { clientFormRules } from "@/utilities/formValidationRules";
import { useAddClient } from "@/hooks/client";
import { Text } from "@/components";
import { colorConfig } from "@/config";

const AddClient = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, handleAvatarChange, onFinish } = useAddClient();

  const colSpan = screens.xs
    ? 24
    : screens.sm
    ? 12
    : screens.md
    ? 8
    : screens.lg
    ? 6
    : 6;
  //
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader
        fileUpload={true}
        setUploadModal={setUploadModal}
        backButtonText={"Back to Clients"}
      />
      <Space
        direction="vertical"
        style={{
          marginTop: "24px",
          width: "100%",
          background: colorConfig?.background || colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: !screens.xs ? "32px" : "16px",
          // flex: "1", // Takes remaining space below header
          overflowY: "scroll", // Prevent overflow
          scrollbarWidth: "none",
          borderRadius: "8px",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{}}
          onFinish={onFinish}
        >
          {/* Centered Image Upload */}
          <Row>
            <Col span={24}>
              <Form.Item label="Upload Client Profile">
                <ImageUpload onAvatarChange={handleAvatarChange} />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Client Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Client Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Client Name"
                name="name"
                rules={clientFormRules.clientName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <IndustrySelector
                label="Industry"
                name="industry"
                rules={clientFormRules.industry}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SubIndustrySelector
                label="Sub Industry"
                name="subIndustry"
                rules={clientFormRules.subIndustry}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                name="offering"
                label="About"
                rules={clientFormRules.offering}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Location & Legal Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Location & Legal Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <TerritorySelector
                label="Territory"
                name="territory"
                rules={clientFormRules.territory}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <IncorporationTypesSelector
                label="Incorporation Type"
                name="incorporationType"
                rules={clientFormRules.incorporationType}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Client Status"
                name="listedCompany"
                rules={clientFormRules.clientStatus}
              >
                <Select>
                  <Select.Option value={true}>Listed</Select.Option>
                  <Select.Option value={false}>Unlisted</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <MarketCapSelector
                name="marketCap"
                label="Market Cap"
                rules={clientFormRules.marketCap}
              />
            </Col>
          </Row>

          {/* Section: Financial Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Financial Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <CurrencyAmountInput
                name="annualRevenue"
                label="Annual Revenue"
                rules={clientFormRules.annualRevenue}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <ClassificationsSelector
                label="Classification"
                name="classification"
                rules={clientFormRules.classification}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Total Employee Strength"
                name="totalEmployeeStrength"
                rules={clientFormRules.totalEmployeeStrength}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="IT Employee Strength"
                name="itEmployeeStrength"
                rules={clientFormRules.itEmployeeStrength}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Relationships */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Relationships
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <UserSelector
                label="Primary Relationship"
                name="primaryRelationship"
                rules={clientFormRules.primaryRelationship}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <UserSelector
                label="Secondary Relationship"
                name="secondaryRelationship"
                rules={clientFormRules.secondaryRelationship}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <RelationshipStatusSelector
                label="Relationship Status"
                name="relationshipStatus"
                rules={clientFormRules.relationshipStatus}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <ContactSelector
                label="Related Contacts"
                name="relatedContacts"
                rules={clientFormRules.relatedContacts}
                mode="multiple"
              />
            </Col>
          </Row>

          {/* Section: Priority */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Priority
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={clientFormRules.priority}
              >
                <Select>
                  <Select.Option value="Very High">Very High</Select.Option>
                  <Select.Option value="High">High</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                  <Select.Option value="Low">Low</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Actions */}
          <Row gutter={24}>
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

        <BulkUploadModal
          setUploadModal={setUploadModal}
          uploadModal={uploadModal}
          resource="client"
        />
      </Space>
    </div>
  );
};

export default AddClient;
