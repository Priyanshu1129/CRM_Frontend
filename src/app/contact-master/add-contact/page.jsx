"use client";
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
  Checkbox,
  Divider,
} from "antd";
import { ArcheTypeSelector, RelationshipDegreeSelector } from "../enums";
import {
  FormHeader,
  InputNotes,
  ImageUpload,
  BulkUploadModal,
  TerritorySelector,
  ClientSelector,
} from "@/components";
import { contactFormRules } from "@/utilities/formValidationRules";
import { useAddContact } from "@/hooks/contact";
import { InputPhoneNumber } from "@/components";
import { colorConfig } from "@/config";
import { Text } from "@/components";

const AddContact = ({}) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint(); // Get current screen size

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    loading,
    onFinish,
    handleAvatarChange,
    mobileCountryCode,
    setMobileCountryCode,
    phoneCountryCode,
    setPhoneCountryCode,
  } = useAddContact();

  // Define dynamic span for different screen sizes
  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 8, // 4 fields per row on desktop and larger
    lg: 6,
  };

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
        backButtonText={"Return"}
      />
      <Space
        direction="vertical"
        style={{
          marginTop: "24px",
          width: "100%",
          background: colorConfig?.background || colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
          // flex: "1", // Takes remaining space below header
          overflowY: "scroll", // Prevent overflow
          scrollbarWidth: "none",
          borderRadius: "8px",
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ color: colorConfig?.textColor || "#000" }}
        >
          {/* Centered Image Upload */}
          <Row>
            <Col>
              <Form.Item
                label={
                  <span style={{ fontWeight: "400" }}>
                    Upload Contact Profile
                  </span>
                }
              >
                <ImageUpload onAvatarChange={handleAvatarChange} />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Personal Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Personal Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="firstName"
                label={<span style={{ fontWeight: "400" }}>First Name</span>}
                rules={contactFormRules.firstName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="lastName"
                label={<span style={{ fontWeight: "400" }}>Last Name</span>}
                rules={contactFormRules.lastName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="gender"
                label={<span style={{ fontWeight: "400" }}>Gender</span>}
                rules={contactFormRules.gender}
              >
                <Select>
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                  <Select.Option value="O">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="memorableInfo"
                label={
                  <span style={{ fontWeight: "400" }}>Something Memorable</span>
                }
                rules={contactFormRules.memorableInfo}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Contact Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Contact Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <InputPhoneNumber
                name="phone"
                label={<span style={{ fontWeight: "400" }}>Phone Number</span>}
                rules={contactFormRules.phone}
                phoneCountryCode={phoneCountryCode}
                setPhoneCountryCode={setPhoneCountryCode}
              />
            </Col>
            <Col {...colSpan}>
              <InputPhoneNumber
                name="mobilePhone"
                label={<span style={{ fontWeight: "400" }}>Mobile Phone</span>}
                rules={contactFormRules.mobilePhone}
                phoneCountryCode={mobileCountryCode}
                setPhoneCountryCode={setMobileCountryCode}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="workEmail"
                label={<span style={{ fontWeight: "400" }}>Work Email</span>}
                rules={contactFormRules.workEmail}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="personalEmail"
                label={
                  <span style={{ fontWeight: "400" }}>Personal Email</span>
                }
                rules={contactFormRules.personalEmail}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Professional Information */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Professional Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <ClientSelector
                name="client"
                label={<span style={{ fontWeight: "400" }}>Client Name</span>}
                rules={contactFormRules.contactName}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="jobTitle"
                label={<span style={{ fontWeight: "400" }}>Job Title</span>}
                rules={contactFormRules.jobTitle}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <ArcheTypeSelector
                name="archeType"
                label={<span style={{ fontWeight: "400" }}>Arche Type</span>}
                rules={contactFormRules.archeType}
              />
            </Col>
            <Col {...colSpan}>
              <RelationshipDegreeSelector
                name="relationshipDegree"
                label={
                  <span style={{ fontWeight: "400" }}>Relationship Degree</span>
                }
                rules={contactFormRules.relationshipDegree}
              />
            </Col>
          </Row>

          {/* Section: Location Details */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Location Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="country"
                label={<span style={{ fontWeight: "400" }}>Country</span>}
                rules={contactFormRules.city}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <TerritorySelector
                label={<span style={{ fontWeight: "400" }}>Territory</span>}
                name="territory"
                rules={contactFormRules.territory}
              />
            </Col>
          </Row>

          {/* Section: Notes and Actions */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Additional Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }}></Divider>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                rules={[{ required: true, message: "Please check the box!" }]}
                name="detailsConfirmation"
                valuePropName="checked"
              >
                <Checkbox>Details are up to date</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <InputNotes />
            </Col>
          </Row>

          {/* Submit and Reset buttons */}
          <Row>
            <Col>
              <Space>
                <Button htmlType="submit" loading={loading} type="primary">
                  Save Contact
                </Button>
                <Button
                  type="default"
                  disabled={loading}
                  onClick={() => form.resetFields()}
                >
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Space>

      {/* Bulk Upload Modal */}
      <BulkUploadModal open={uploadModal} setOpen={setUploadModal} />
    </div>
  );
};

export default AddContact;
