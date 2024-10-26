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
} from "antd";
import { ArcheTypeSelector, RelationshipDegreeSelector } from "../../enums";
import { InputNotes, ImageUpload, TerritorySelector } from "@/components";
import { contactFormRules } from "@/utilities/formValidationRules";
import { ClientSelector } from "@/components";
import { InputPhoneNumber } from "@/components";
import { useUpdateContact } from "@/hooks/contact";

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

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <Form layout="vertical" form={form} size={"default"} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Upload Contact Profile" name="avatar">
              <ImageUpload
                initialImage={contact?.avatar}
                onAvatarChange={handleAvatarChange}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={contactFormRules.firstName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={contactFormRules.lastName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
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
          <Col span={8}>
            <ClientSelector
              name="client"
              label="Client Name"
              rules={contactFormRules.contactName}
            />
          </Col>
          <Col span={8}>
            <Form.Item
              name="jobTitle"
              label="Job Title"
              rules={contactFormRules.jobTitle}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <InputPhoneNumber
              name="phone"
              label="Phone Number"
              rules={contactFormRules.phone}
              phoneCountryCode={phoneCountryCode}
              setPhoneCountryCode={setPhoneCountryCode}
            />
          </Col>
          <Col span={8}>
            <InputPhoneNumber
              name="mobilePhone"
              label="Mobile Phone"
              rules={contactFormRules.mobilePhone}
              phoneCountryCode={mobileCountryCode}
              setPhoneCountryCode={setMobileCountryCode}
            />
          </Col>

          <Col span={8}>
            <Form.Item
              name="workEmail"
              label="Work Email"
              rules={contactFormRules.workEmail}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="personalEmail"
              label="Personal Email"
              rules={contactFormRules.personalEmail}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <ArcheTypeSelector
              name="archeType"
              label="Arche Type"
              rules={contactFormRules.archeType}
            />
          </Col>
          <Col span={8}>
            <RelationshipDegreeSelector
              name="relationshipDegree"
              label="Relationship Degree"
              rules={contactFormRules.relationshipDegree}
            />
          </Col>
          <Col span={8}>
            <Form.Item
              name="country"
              label="Country"
              rules={contactFormRules.city}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <TerritorySelector
              label="Territory"
              name="territory"
              rules={contactFormRules.territory}
            />
          </Col>
          <Col span={8}>
            <Form.Item
              name="memorableInfo"
              label="Something memorable about him/her"
              rules={contactFormRules.memorableInfo}
            >
              <Input />
            </Form.Item>
          </Col>
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
                  disabled={loading}
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