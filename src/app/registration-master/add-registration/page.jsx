"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  notification,
  Space,
  Grid,
  theme,
  Row,
  Col,
  DatePicker,
} from "antd";

import {
  ContactSelector,
  StaffSelector,
  ClientSelector,
  FormHeader,
  InputNotes,
  BulkUploadModal,
} from "@/components";
import { RegistrationStatusSelector } from "../enums";
import { createRegistration } from "@/redux/actions/registrationAction";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { registrationFormRules } from "../../../utilities/formValidationRules";

const AddRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.registration.createRegistration
  );

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
        description: "Registration added successfully.",
      });
      dispatch(registrationActions.clearCreateRegistrationStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add registration.",
      });
      dispatch(registrationActions.clearCreateRegistrationStatus());
      dispatch(registrationActions.clearCreateRegistrationError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);

    const formattedValues = {
      ...values,
      registrationDate: values.registrationDate.format("YYYY-MM-DD"),
      expiryDate: values.expiryDate.format("YYYY-MM-DD"),
      entryDate: "2024-08-10T00:00:00.000Z",
      enteredBy: "64cf1c8a6e6e3c0b34a25f95",
      websiteDetails: {
        username: values.username || null,
        password: values.password || null,
      },
    };
    console.log("submit", formattedValues);
    dispatch(createRegistration(formattedValues));
  };

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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
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
        <BulkUploadModal
          setUploadModal={setUploadModal}
          uploadModal={uploadModal}
        />
      </Space>
    </>
  );
};
export default AddRegistration;
