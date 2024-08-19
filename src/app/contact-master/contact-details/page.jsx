"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Grid,
  theme,
  Row,
  Col,
  Checkbox,
} from "antd";

import { ArcheTypeSelector, RelationshipDegreeSelector } from "../enums";
import { FormHeader, InputNotes, ImageUpload } from "@/components";
import { contactFormRules } from "@/utilities/formValidationRules";
import { contactActions } from "@/redux/slices/contactSlice";
import { createContact } from "@/redux/actions/contactAction";
import { ClientSelector } from "@/components";
import { notification } from "antd";

const AddContact = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.contact.createContact);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Contact added successfully.",
      });
      dispatch(contactActions.clearCreateContactStatus());
      // dispatch(contactActions.clearCreateContactData());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add contact.",
      });
      dispatch(contactActions.clearCreateContactStatus());
      dispatch(contactActions.clearCreateContactError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    let newValues = {
      ...values,
      entryDate: "2024-08-10T00:00:00.000Z",
      enteredBy: "64cf1c8a6e6e3c0b34a25f95",
    };
    console.log("submit", newValues);
    dispatch(createContact(newValues));
  };

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

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
          layout="vertical"
          initialValues={{}}
          form={form}
          size={"default"}
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Upload Contact Profile">
                <ImageUpload />
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
              <Form.Item
                name="phone"
                label="Phone"
                rules={contactFormRules.phone}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="mobilePhone"
                label="Mobile Phone"
                rules={contactFormRules.mobilePhone}
              >
                <Input />
              </Form.Item>
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
                name="archType"
                label="Arch Type"
                rules={contactFormRules.archType}
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
              <Form.Item name="city" label="City" rules={contactFormRules.city}>
                <Input />
              </Form.Item>
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
              <InputNotes />
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="button"
                  onClick={() => form.resetFields()}
                  loading={loading}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};
export default AddContact;
