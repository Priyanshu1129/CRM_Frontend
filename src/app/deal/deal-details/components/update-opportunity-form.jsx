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
  DatePicker,
} from "antd";

import {
  SolutionSelector,
  SubSolutionSelector,
  SalesStageSelector,
  SalesSubStageSelector,
  UserSelector,
  ClientSelector,
  TenderSelector,
  CurrencyAmountInput,
  Text,
} from "@/components";
import { RevenueInput } from "../../components/revenueInput";
import {
  opportunityFormRules,
  tenderFormRules,
} from "@/utilities/formValidationRules";
import { useUpdateOpportunity } from "@/hooks/deal";
import { colorConfig } from "@/config";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";

export const UpdateOpportunityForm = ({ opportunity }) => {
  const [form] = Form.useForm();
  const canUpdateOpportunity = useCheckPermission("/opportunity/update");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, onFinish } = useUpdateOpportunity({
    opportunity,
    form,
  });

  return (
    <Form
      layout="vertical"
      form={form}
      disabled={!canUpdateOpportunity}
      // size={"default"}
      onFinish={onFinish}
    >
      {/* Section: Basic Information */}
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Basic Information
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="updateDate" label="Update Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="customId" label="Custom Id">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ClientSelector
            name="client"
            label="Client Name"
            rules={opportunityFormRules.clientName}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item
            name="partneredWith"
            label="In Partnership"
            rules={opportunityFormRules.partneredWith}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Section: Project & Tender Details */}
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Project & Tender Details
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={opportunityFormRules.projectName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TenderSelector
            name="associatedTender"
            label="Associated Tender"
            rules={opportunityFormRules.associatedTender}
            disabled={true}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <SolutionSelector
            name="solution"
            label="Solution"
            rules={opportunityFormRules.solution}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <SubSolutionSelector
            name="subSolution"
            label="Sub Solution"
            rules={opportunityFormRules.subSolution}
          />
        </Col>
      </Row>

      {/* Section: Sales Information */}
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Sales Information
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <UserSelector
            name="salesChamp"
            label="Sales Champ"
            rules={opportunityFormRules.salesChamp}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <SalesStageSelector
            name="salesStage"
            label="Sales Stage"
            form={form}
            rules={opportunityFormRules.salesStage}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <SalesSubStageSelector
            name="salesSubStage"
            label="Sales Sub Stage"
            rules={opportunityFormRules.salesSubStage}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item
            name="stageClarification"
            label="Stage Clarification"
            rules={opportunityFormRules.stageClarification}
          >
            <Input />
          </Form.Item>
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
            name="salesTopLine"
            label="Sales Top-Line"
            rules={opportunityFormRules.salesTopLine}
            disabled={!canUpdateOpportunity}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CurrencyAmountInput
            name="offsets"
            label="Offsets"
            rules={opportunityFormRules.offsets}
            disabled={!canUpdateOpportunity}
          />
        </Col>
        <Col span={24}>
          <RevenueInput form={form} rules={opportunityFormRules.revenue} />
        </Col>
      </Row>

      {/* Section: Expected Date */}
      <Space>
        <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
          Expected Date
        </Text>
      </Space>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item
            name="expectedWonDate"
            label="Expected Won Date"
            rules={tenderFormRules.bondIssueDate}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="closingDate" label="Closing Date">
            <DatePicker disabled style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Section: Actions */}
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Space>
              <Button
                // disabled
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!canUpdateOpportunity}
              >
                Update
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={() => form.resetFields()}
                disabled={loading || !canUpdateOpportunity}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
