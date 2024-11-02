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
} from "@/components";
import { clientFormRules } from "@/utilities/formValidationRules";
import { useUpdateClient } from "@/hooks/client";

export const UpdateClientForm = ({ client }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const [currency, setCurrency] = useState(1);
  const { loading, onFinish, handleAvatarChange } = useUpdateClient({
    client,
    currency,
    form,
  });

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        //  size="default"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Upload Client Profile" name="avatar">
              <ImageUpload
                initialImage={client?.avatar}
                onAvatarChange={handleAvatarChange}
              />
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
              label="About"
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
              name="listedCompany"
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
            <CurrencyAmountInput
              name="annualRevenue"
              label="Annual Revenue"
              rules={clientFormRules.annualRevenue}
              currency={currency}
              setCurrency={setCurrency}
            />
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
            <UserSelector
              label="Primary Relationship"
              name="primaryRelationship"
              rules={clientFormRules.primaryRelationship}
            />
          </Col>
          <Col span={colSpan}>
            <UserSelector
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
            <ContactSelector
              label="Related Contacts"
              name="relatedContacts"
              rules={clientFormRules.relatedContacts}
              mode="multiple"
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
          <Col span={colSpan}>
            <CurrencyAmountInput
              label="Life Time Value"
              name="lifeTimeValue"
              currency={currency}
              setCurrency={setCurrency}
              disabled={true}
            />
          </Col>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
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
