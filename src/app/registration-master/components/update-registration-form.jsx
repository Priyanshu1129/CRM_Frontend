"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Space,
  Grid,
  theme,
  Row,
  Col,
  DatePicker,
  notification,
} from "antd";
import {
  ClientSelector,
  StaffSelector,
  ContactSelector,
  InputNotes,
} from "@/components";

import { RegistrationStatusSelector } from "../enums";
import { registrationFormRules } from "@/utilities/formValidationRules";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { updateRegistration } from "@/redux/actions/registrationAction";
import moment from "moment";

export const UpdateRegistrationForm = ({ registration }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.registration.updateRegistration
  );

  useEffect(() => {
    if (registration) {
      form.setFieldsValue({
        client: registration.client,
        registrationChamp: registration.registrationChamp,
        status: registration.status,
        username: registration.websiteDetails?.username,
        password: registration.websiteDetails?.password,
        otherDetails: registration.otherDetails,
        registrationDate: registration.registrationDate
          ? moment(registration.registrationDate)
          : null,
        expiryDate: registration.expiryDate
          ? moment(registration.expiryDate)
          : null,
        primaryContact: registration.primaryContact,
        submittedDocuments: registration.submittedDocuments,
        notes: registration.notes,
      });
    }
  }, [registration, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Registration updated successfully.",
      });
      dispatch(registrationActions.clearUpdateRegistrationStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update registration.",
      });
      dispatch(registrationActions.clearUpdateRegistrationStatus());
      dispatch(registrationActions.clearUpdateRegistrationError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    const updatedValues = {
      ...values,
      registrationDate: values.registrationDate?.format("YYYY-MM-DD"),
      expiryDate: values.expiryDate?.format("YYYY-MM-DD"),
      websiteDetails: {
        username: values.username || null,
        password: values.password || null,
      },
    };
    dispatch(updateRegistration(updatedValues));
  };
  return (
    <>
      <Form
        layout="vertical"
        initialValues={{}}
        form={form}
        onFinish={onFinish}
        size={"default"}
      >
        <Row gutter={24}>
          <Col span={8}>
            <ClientSelector
              name="client"
              label="Client Name"
              rules={registrationFormRules.clientName}
            />
          </Col>
          <Col span={8}>
            <StaffSelector
              name="registrationChamp"
              label="Registration Champ"
              rules={registrationFormRules.registrationChamp}
            />
          </Col>
          <Col span={8}>
            <RegistrationStatusSelector
              name="status"
              label="Registration Status"
              rules={registrationFormRules.registrationStatus}
            />
          </Col>
          <Col span={8}>
            <Form.Item
              name="username"
              label="Registered Username"
              rules={registrationFormRules.registeredUsername}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="password"
              label="Registered Password"
              rules={registrationFormRules.registeredPassword}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="otherDetails"
              label="Other Details"
              rules={registrationFormRules.otherDetails}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="registrationDate"
              label="Registration Date"
              rules={registrationFormRules.registrationDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="expiryDate"
              label="Valid Until"
              rules={registrationFormRules.validUntil}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <ContactSelector
              name="primaryContact"
              label="Primary Registration Contact"
              rules={registrationFormRules.primaryRegistrationContact}
            />
          </Col>
          <Col span={8}>
            <Form.Item
              name="submittedDocuments"
              label="Submitted Documents"
              rules={registrationFormRules.submittedDocuments}
            >
              <Input />
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
                  disabled
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
                  loading={loading}
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
