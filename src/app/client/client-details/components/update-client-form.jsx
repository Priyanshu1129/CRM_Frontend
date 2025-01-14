"use client";
import React, { useState } from "react";
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
  Divider,
} from "antd";
import {
  ClassificationsSelector,
  IncorporationTypesSelector,
  RelationshipStatusSelector,
  MarketCapSelector,
} from "../../enums";
import {
  IndustrySelector,
  SubIndustrySelector,
  TerritorySelector,
  UserSelector,
  ImageUpload,
  ContactSelector,
  CurrencyAmountInput,
  Text,
} from "@/components";
import { clientFormRules } from "@/utilities/formValidationRules";
import { useUpdateClient } from "@/hooks/client";
import { colorConfig } from "@/config";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";

export const UpdateClientForm = ({ client }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const canUpdateClient = useCheckPermission("/client/update");
  const { loading, onFinish, handleAvatarChange } = useUpdateClient({
    client,
    form,
  });

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        //  size="default"-
        disabled={!canUpdateClient}
      >
        <Row>
          <Col span={24}>
            <Form.Item label="Upload Client Profile" name="avatar">
              <ImageUpload
                initialImage={client?.avatar}
                onAvatarChange={handleAvatarChange}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Section: Client Information */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Client Information
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Client Name"
              name="name"
              rules={clientFormRules.clientName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <IndustrySelector
              label="Industry"
              name="industry"
              rules={clientFormRules.industry}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <SubIndustrySelector
              label="Sub Industry"
              name="subIndustry"
              rules={clientFormRules.subIndustry}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              name="offering"
              label="About"
              rules={clientFormRules.offering}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* Section: Location & Legal Information */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Location & Legal Information
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <TerritorySelector
              label="Territory"
              name="territory"
              rules={clientFormRules.territory}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <IncorporationTypesSelector
              label="Incorporation Type"
              name="incorporationType"
              rules={clientFormRules.incorporationType}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Client Status"
              name="listedCompany"
              rules={clientFormRules.clientStatus}
            >
              <Select>
                <Select.Option value={true}>Listed</Select.Option>
                <Select.Option value={false}>Unlisted</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <MarketCapSelector
              name="marketCap"
              label="Market Cap"
              rules={clientFormRules.marketCap}
            />
          </Col>
        </Row>

        {/* Section: Financial Information */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Financial Information
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CurrencyAmountInput
              disabled={!canUpdateClient}
              name="annualRevenue"
              label="Annual Revenue"
              rules={clientFormRules.annualRevenue}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <ClassificationsSelector
              label="Classification"
              name="classification"
              rules={clientFormRules.classification}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Total Employee Strength"
              name="totalEmployeeStrength"
              rules={clientFormRules.totalEmployeeStrength}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="IT Employee Strength"
              name="itEmployeeStrength"
              rules={clientFormRules.itEmployeeStrength}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        {/* Section: Relationships */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Relationships
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <UserSelector
              label="Primary Relationship"
              name="primaryRelationship"
              rules={clientFormRules.primaryRelationship}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <UserSelector
              label="Secondary Relationship"
              name="secondaryRelationship"
              rules={clientFormRules.secondaryRelationship}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RelationshipStatusSelector
              label="Relationship Status"
              name="relationshipStatus"
              rules={clientFormRules.relationshipStatus}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <ContactSelector
              label="Related Contacts"
              name="relatedContacts"
              rules={clientFormRules.relatedContacts}
              mode="multiple"
            />
          </Col>
        </Row>

        {/* Section: Priority */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Priority & Life Time Value
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6}>
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
          <Col xs={24} sm={12} md={8} lg={6}>
            <CurrencyAmountInput
              label="Life Time Value"
              name="lifeTimeValue"
              disabled={true}
            />
          </Col>
        </Row>

        {/* Section: Actions */}
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!canUpdateClient}
                >
                  Update
                </Button>
                <Button
                  type="default"
                  htmlType="button"
                  onClick={() => form.resetFields()}
                  disabled={loading || !canUpdateClient}
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
