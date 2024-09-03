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
import {
  FormHeader,
  InputNotes,
  ImageUpload,
  BulkUploadModal,
} from "@/components";
import { contactFormRules } from "@/utilities/formValidationRules";
import { contactActions } from "@/redux/slices/contactSlice";
import { createContact } from "@/redux/actions/contactAction";
import { ClientSelector } from "@/components";
import { notification } from "antd";
import { countryCode } from "@/config/data";

const { Option } = Select;

const AddContact = () => {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.contact.createContact);

  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [mobileCountryCode, setMobileCountryCode] = useState("+1");

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
    let newValues = {
      ...values,
      entryDate: "2024-08-24T00:00:00.000Z",
      avatar: avatarChanged ? avatar : null,
      phone: `${phoneCountryCode} ${values.phone}`,
      mobilePhone: `${mobileCountryCode} ${values.mobilePhone}`,
    };
    console.log("submit", newValues);
    dispatch(createContact(newValues));
  };

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <FormHeader
        fileUpload={true}
        setUploadModal={setUploadModal}
        backButtonText={"Return"}
      />
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
                <ImageUpload onAvatarChange={handleAvatarChange} />
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
                <Input
                  addonBefore={
                    <Select
                      defaultValue={phoneCountryCode}
                      onChange={setPhoneCountryCode}
                    >
                      {countryCode.map((country) => (
                        <Option key={country.code} value={country.dial_code}>
                          {country.dial_code}
                        </Option>
                      ))}
                    </Select>
                  }
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="mobilePhone"
                label="Mobile Phone"
                rules={contactFormRules.mobilePhone}
              >
                <Input
                  addonBefore={
                    <Select
                      defaultValue={mobileCountryCode}
                      onChange={setMobileCountryCode}
                    >
                      {countryCode.map((country) => (
                        <Option key={country.code} value={country.dial_code}>
                          {country.dial_code}
                        </Option>
                      ))}
                    </Select>
                  }
                  type="number"
                />
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
          resource="contact"
        />
      </Space>
    </>
  );
};
export default AddContact;
