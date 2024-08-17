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
} from "antd";

import { FormHeader, InputNotes } from "@/components";
import { RegistrationStatusSelector } from "./enums";
import { StaffSelector } from "@/components";
import { createRegistration } from "@/redux/actions/registrationAction";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { registrationFormRules } from "../../../utilities/formValidationRules";

const AddRegistration = () => {
  const [loading, setLoading] = useState(false);
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
    dispatch(createRegistration(values));
  };

  return (
    <>
      <FormHeader buttonText={"Cancel"}/>
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
          onFinish={onFinish}
          size={"default"}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="client"
                label="Client Name"
                rules={registrationFormRules.clientName}
              >
                <Select>
                  <Select.Option value={"c1"}>Client 1</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="registrationChamp"
                label="Registration Champ"
                rules={registrationFormRules.registrationChamp}
              >
                <StaffSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Registration Status"
                rules={registrationFormRules.registrationStatus}
              >
                <RegistrationStatusSelector />
              </Form.Item>
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
                <Input />
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
                name="registeredDate"
                label="Registered Date"
                rules={registrationFormRules.registeredDate}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="expiryDate"
                label="Valid Until"
                rules={registrationFormRules.validUntil}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="primaryContact"
                label="Primary Registration Contact"
                rules={registrationFormRules.primaryRegistrationContact}
              >
                <Select>
                  <Select.Option value={"contact1"}>Contact 1</Select.Option>
                </Select>
              </Form.Item>
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
export default AddRegistration;
