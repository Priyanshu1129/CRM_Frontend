"use client";
import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Grid,
  Row,
  Col,
  Checkbox,
  Divider,
} from "antd";
import { ArcheTypeSelector, RelationshipDegreeSelector } from "../../enums";
import { InputNotes, ImageUpload, TerritorySelector, Text } from "@/components";
import { contactFormRules } from "@/utilities/formValidationRules";
import { ClientSelector } from "@/components";
import { InputPhoneNumber } from "@/components";
import { useUpdateContact } from "@/hooks/contact";
import { colorConfig } from "@/config";

export const UpdateContactForm = ({ contact }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    loading,
    onFinish,
    handleAvatarChange,
    phoneCountryCode,
    setPhoneCountryCode,
    mobileCountryCode,
    setMobileCountryCode,
  } = useUpdateContact({ form, contact });

  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 8, // 4 fields per row on desktop and larger
    lg: 6,
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        // size={"default"}
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <Form.Item label="Upload Contact Profile" name="avatar">
              <ImageUpload
                initialImage={contact?.avatar}
                onAvatarChange={handleAvatarChange}
              />
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
              label="First Name"
              rules={contactFormRules.firstName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={contactFormRules.lastName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="gender"
              label="Gender"
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
              label="Something memorable"
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
              label="Phone Number"
              rules={contactFormRules.phone}
              phoneCountryCode={phoneCountryCode}
              setPhoneCountryCode={setPhoneCountryCode}
            />
          </Col>
          <Col {...colSpan}>
            <InputPhoneNumber
              name="mobilePhone"
              label="Mobile Phone"
              rules={contactFormRules.mobilePhone}
              phoneCountryCode={mobileCountryCode}
              setPhoneCountryCode={setMobileCountryCode}
            />
          </Col>

          <Col {...colSpan}>
            <Form.Item
              name="workEmail"
              label="Work Email"
              rules={contactFormRules.workEmail}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="personalEmail"
              label="Personal Email"
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
              label="Client Name"
              rules={contactFormRules.contactName}
            />
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="jobTitle"
              label="Job Title"
              rules={contactFormRules.jobTitle}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <ArcheTypeSelector
              name="archeType"
              label="Arche Type"
              rules={contactFormRules.archeType}
            />
          </Col>
          <Col {...colSpan}>
            <RelationshipDegreeSelector
              name="relationshipDegree"
              label="Relationship Degree"
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
              label="Country"
              rules={contactFormRules.city}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <TerritorySelector
              label="Territory"
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
            <Form.Item name="notes" label="Notes">
              <InputNotes />
            </Form.Item>
          </Col>
        </Row>

        {/* Submit and Reset buttons */}
        <Row>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update
                </Button>
                <Button
                  type="default"
                  disabled={loading}
                  onClick={() => form.resetFields()}
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
