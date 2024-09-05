"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  notification,
} from "antd";
import { ArcheTypeSelector, RelationshipDegreeSelector } from "../enums";
import { InputNotes, ImageUpload } from "@/components";
import { contactFormRules } from "@/utilities/formValidationRules";
import { contactActions } from "@/redux/slices/contactSlice";
import { updateContact } from "@/redux/actions/contactAction";
import { ClientSelector } from "@/components";
import { getChangedValues } from "@/utilities/getChangedValues";
import { countryCode } from "@/config/data";

let { Option } = Select;

export const UpdateContactForm = ({ contact }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.contact.updateContact);

  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [mobileCountryCode, setMobileCountryCode] = useState("+1");

  const initialValues = useRef({});
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (contact) {
      const contactInitialValues = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        gender: contact.gender,
        client: contact.client,
        jobTitle: contact.jobTitle,
        workEmail: contact.workEmail,
        personalEmail: contact.personalEmail,
        archeType: contact.archeType,
        relationshipDegree: contact.relationshipDegree,
        city: contact.city,
        memorableInfo: contact.memorableInfo,
        detailsConfirmation: contact.detailsConfirmation,
        avatar: contact.avatar,
        phone: contact.phone
          ? contact.phone?.toString().replace(/^\+\d+/, "")
          : "",
        mobilePhone: contact.mobilePhone
          ? contact.mobilePhone?.toString().replace(/^\+\d+/, "")
          : "",
        phoneCountryCode: contact.phone
          ? (contact.phone?.toString().match(/^\+\d+/) || ["+1"])[0]
          : "+1",
        mobileCountryCode: contact.mobilePhone
          ? (contact.mobilePhone?.toString().match(/^\+\d+/) || ["+1"])[0]
          : "+1",
          notes: contact.notes,  
      };
      setPhoneCountryCode(
        contact.phone
          ? (contact.phone?.toString().match(/^\+\d+/) || ["+1"])[0]
          : "+1"
      );
      setMobileCountryCode(
        contact.mobilePhone
          ? (contact.mobilePhone?.toString().match(/^\+\d+/) || ["+1"])[0]
          : "+1"
      );
      form.setFieldsValue({
        ...contactInitialValues,
        phone: contact.phone?.replace(/^\+\d+\s*/, ""),
        mobilePhone: contact.mobilePhone?.replace(/^\+\d+\s*/, ""),
      });
      initialValues.current = contactInitialValues;
    }
  }, [contact, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Contact updated successfully.",
      });
      dispatch(contactActions.clearUpdateContactStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update contact.",
      });
      dispatch(contactActions.clearUpdateContactStatus());
      dispatch(contactActions.clearUpdateContactError());
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

    // Compare current values with initial values and get only changed values

    const updatedValues = {
      ...values,
      phone: `${phoneCountryCode} ${values.phone}`,
      mobilePhone: `${mobileCountryCode} ${values.mobilePhone}`,
    };

    console.log(updatedValues);

    const changedValues = getChangedValues(initialValues, updatedValues);

    if (avatarChanged) {
      changedValues.avatar = avatar;
    }

    console.log("Changed values:", changedValues);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      dispatch(updateContact(changedValues, contact._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

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
            <Form.Item
              name="phone"
              label="Phone"
              rules={contactFormRules.phone}
            >
              <Input
                addonBefore={
                  <Select
                    value={phoneCountryCode}
                    onChange={setPhoneCountryCode}
                  >
                    {countryCode.map((country) => (
                      <Option key={country.code} value={country.dial_code}>
                        {country.dial_code} {country.code}
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
                    value={mobileCountryCode}
                    onChange={setMobileCountryCode}
                  >
                    {countryCode.map((country) => (
                      <Option key={country.code} value={country.dial_code}>
                        {country.dial_code} {country.code}
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
