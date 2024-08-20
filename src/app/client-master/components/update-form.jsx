"use client";
import React, { useState, useEffect } from "react";
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
  notification,
} from "antd";
import {
  ClassificationsSelector,
  IncorporationTypesSelector,
  RelationshipStatusSelector,
  MarketCapSelector,
} from "../enums";
import {
  IndustrySelector,
  SubIndustrySelector,
  TerritorySelector,
  StaffSelector,
  ImageUpload,
} from "@/components";
import { clientActions } from "@/redux/slices/clientSlice";
import { clientFormRules } from "@/utilities/formValidationRules";
import { updateClient } from "@/redux/actions/clientAction";

export const UpdateClientForm = ({ client }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error, data } = useSelector(
    (state) => state.client.updateClient
  );

  useEffect(() => {
    if (client) {
      form.setFieldsValue({
        name: client.name,
        industry: client.industry,
        subIndustry: client.subIndustry,
        offering: client.offering,
        territory: client.territory,
        incorporationType: client.incorporationType,
        clientStatus: client.clientStatus,
        marketCap: client.marketCap,
        annualRevenue: client.annualRevenue,
        classification: client.classification,
        totalEmployeeStrength: client.totalEmployeeStrength,
        itEmployeeStrength: client.itEmployeeStrength,
        primaryRelationship: client.primaryRelationship,
        secondaryRelationship: client.secondaryRelationship,
        relationshipStatus: client.relationshipStatus,
        relatedContacts: client.relatedContacts,
        priority: client.priority,
      });
    }
  }, [client, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Client updated successfully.",
      });
      dispatch(clientActions.clearUpdateClientStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update client.",
      });
      dispatch(clientActions.clearUpdateClientStatus());
      dispatch(clientActions.clearUpdateClientError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    const updatedValues = {
      ...client,
      ...values,
    };
    dispatch(updateClient(updatedValues));
  };

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish} size="default">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Upload Client Profile" name="profileImage">
              <ImageUpload initialImage={client?.profileImage} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label="Client Name"
              name="name"
              rules={clientFormRules.clientName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <IndustrySelector
              label="Industry"
              name="industry"
              rules={clientFormRules.industry}
            />
          </Col>
          <Col span={colSpan}>
            <SubIndustrySelector
              label="Sub Industry"
              name="subIndustry"
              rules={clientFormRules.subIndustry}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="offering"
              label="What do they offer?"
              rules={clientFormRules.offering}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <TerritorySelector
              label="Territory"
              name="territory"
              rules={clientFormRules.territory}
            />
          </Col>
          <Col span={colSpan}>
            <IncorporationTypesSelector
              label="Incorporation Type"
              name="incorporationType"
              rules={clientFormRules.incorporationType}
            />
          </Col>
          <Col span={colSpan}>
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
          <Col span={colSpan}>
            <MarketCapSelector
              name="marketCap"
              label="Market Cap"
              rules={clientFormRules.marketCap}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label="Annual Revenue"
              name="annualRevenue"
              rules={clientFormRules.annualRevenue}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <ClassificationsSelector
              label="Classification"
              name="classification"
              rules={clientFormRules.classification}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label="Total Employee Strength"
              name="totalEmployeeStrength"
              rules={clientFormRules.totalEmployeeStrength}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label="IT Employee Strength"
              name="itEmployeeStrength"
              rules={clientFormRules.itEmployeeStrength}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <StaffSelector
              label="Primary Relationship"
              name="primaryRelationship"
              rules={clientFormRules.primaryRelationship}
            />
          </Col>
          <Col span={colSpan}>
            <StaffSelector
              label="Secondary Relationship"
              name="secondaryRelationship"
              rules={clientFormRules.secondaryRelationship}
            />
          </Col>
          <Col span={colSpan}>
            <RelationshipStatusSelector
              label="Relationship Status"
              name="relationshipStatus"
              rules={clientFormRules.relationshipStatus}
            />
          </Col>
          <Col span={colSpan}>
            <StaffSelector
              label="Related Contacts"
              name="relatedContacts"
              rules={clientFormRules.relatedContacts}
            />
          </Col>
          <Col span={colSpan}>
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
