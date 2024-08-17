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
import {
  ClassificationsSelector,
  IncorporationTypesSelector,
  RelationshipStatusSelector,
} from "./enums";
import {
  ListHeader,
  IndustrySelector,
  SubIndustrySelector,
  TerritorySelector,
  StaffSelector,
} from "@/components";
import { clientActions } from "@/redux/slices/clientSlice";
import { clientFormRules } from "@/utilities/formValidationRules";
import { createClient } from "@/redux/actions/clientAction";
const AddClient = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.client.createClient);

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
        description: "Client added successfully.",
      });
      dispatch(clientActions.clearCreateClientStatus());
      // dispatch(clientActions.clearCreateClientData());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add client.",
      });
      dispatch(clientActions.clearCreateClientStatus());
      dispatch(clientActions.clearCreateClientError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(createClient(values));
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="billion">B</Select.Option>
        <Select.Option value="million">M</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <ListHeader toPath={"add-client"} buttonText={"Add new client"} />
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
          // labelCol={{
          //   span: 12,
          // }}
          // wrapperCol={{
          //   span: 12,
          // }}
          form={form}
          layout="vertical"
          initialValues={{}}
          onFinish={onFinish}
          size={"default"}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Client Name"
                name="clientName"
                rules={clientFormRules.clientName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Industry"
                name="industry"
                rules={clientFormRules.industry}
              >
                <IndustrySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Sub Industry"
                name="subIndustry"
                rules={clientFormRules.subIndustry}
              >
                <SubIndustrySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="offering"
                label="What do they offer ?"
                rules={clientFormRules.offering}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Territory"
                name="territory"
                rules={clientFormRules.territory}
              >
                <TerritorySelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Incorporation Type"
                name="incorporationType"
                rules={clientFormRules.incorporationType}
              >
                <IncorporationTypesSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Client Status"
                name="clientStatus"
                rules={clientFormRules.clientStatus}
              >
                <Select>
                  <Select.Option value={true}>Listed</Select.Option>
                  <Select.Option value={false}>Unlisted</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="marketCap"
                label="Market Cap"
                rules={clientFormRules.marketCap}
              >
                {/* <InputNumber
                  addonAfter={suffixSelector}
                  style={{
                    width: "100%",
                  }}
                /> */}
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Annual Revenue"
                name="annualRevenue"
                rules={clientFormRules.annualRevenue}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Classification"
                name="classification"
                rules={clientFormRules.classification}
              >
                <ClassificationsSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Employee Strength"
                name="totalEmployeeStrength"
                rules={clientFormRules.totalEmployeeStrength}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="IT Employee Strength"
                name="itEmployeeStrength"
                rules={clientFormRules.itEmployeeStrength}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Primary Relationship"
                name="primaryRelationship"
                rules={clientFormRules.primaryRelationship}
              >
                <StaffSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Secondary Relationship (Pref Economic)"
                name="secondaryRelationship"
                rules={clientFormRules.secondaryRelationship}
              >
                <StaffSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Relationship Status"
                name="relationshipStatus"
                rules={clientFormRules.relationshipStatus}
              >
                <RelationshipStatusSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Related Contacts"
                name="relatedContacts"
                rules={clientFormRules.relatedContacts}
              >
                <StaffSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
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
export default AddClient;
