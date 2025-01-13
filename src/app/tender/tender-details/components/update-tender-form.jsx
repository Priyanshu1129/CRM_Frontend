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
  DatePicker,
  Divider,
} from "antd";
import {
  ClientSelector,
  OpportunitySelector,
  UserSelector,
  CurrencyAmountInput,
  Text,
} from "@/components";
import { StageSelector } from "../../enums";
import { tenderFormRules } from "@/utilities/formValidationRules";
import { useUpdateTender } from "@/hooks/tender";
import { colorConfig } from "@/config";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";

export const UpdateTenderForm = ({ tender }) => {
  const [form] = Form.useForm();
  const canUpdateTender = useCheckPermission("/tender/update");

  const { loading, onFinish } = useUpdateTender({ tender, form });

  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 6, // 4 fields per row on desktop and larger
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        disabled={!canUpdateTender}
        // size={"default"}
      >
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            RFP Details
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col {...colSpan}>
            <Form.Item
              name="rfpDate"
              label="RFP Date"
              rules={tenderFormRules.rfpDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="submissionDueDate"
              label="Submission Due Date"
              rules={tenderFormRules.submissionDueDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <ClientSelector
              name="client"
              label="Client Name"
              rules={tenderFormRules.clientName}
              disabled={true}
            />
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="reference"
              label="Reference"
              rules={tenderFormRules.reference}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* Tender Details Section */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Tender Details
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col {...colSpan}>
            <Form.Item
              name="rfpTitle"
              label="RFP Title"
              rules={tenderFormRules.rfpTitle}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="rfpSource"
              label="How did we receive RFP?"
              rules={tenderFormRules.rfpSource}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <OpportunitySelector
              name="associatedOpportunity"
              label="Associated Opportunity"
              rules={tenderFormRules.associatedOpportunity}
            />
          </Col>
        </Row>

        {/* Bond Information Section */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Bond Information
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col {...colSpan}>
            <Form.Item name="bond" label="Bond" rules={tenderFormRules.bond}>
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <CurrencyAmountInput
              disabled={!canUpdateTender}
              name="bondValue"
              label="Bond Value"
              rules={tenderFormRules.bondValue}
            />
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="bondIssueDate"
              label="Bond Issue Date"
              rules={tenderFormRules.bondIssueDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="bondExpiry"
              label="Bond Valid Until"
              rules={tenderFormRules.bondValidUntil}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Submission Details Section */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Submission Details
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col {...colSpan}>
            <Form.Item
              name="submissionMode"
              label="Submission Mode"
              rules={tenderFormRules.submissionMode}
            >
              <Select>
                <Select.Option value={"Email"}>Email</Select.Option>
                <Select.Option value={"Hard Copy"}>Hard Copy</Select.Option>
                <Select.Option value={"Portal"}>Portal</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="evaluationDate"
              label="Evaluation Date"
              rules={tenderFormRules.evaluationDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <UserSelector
              name="officer"
              label="Tender Officer"
              rules={tenderFormRules.tenderOfficer}
            />
          </Col>
          <Col {...colSpan}>
            <UserSelector
              name="bidManager"
              label="Bid Manager"
              rules={tenderFormRules.bidManager}
            />
          </Col>
        </Row>

        {/* Tender Stage Section */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Tender Stage
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col {...colSpan}>
            <StageSelector
              name="stage"
              label="Tender Stage"
              rules={tenderFormRules.tenderStage}
            />
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="stageExplanation"
              label="Stage Explanation"
              rules={tenderFormRules.stageExplanation}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <Form.Item
              name="submissionDate"
              label="Submission Date"
              rules={tenderFormRules.submissionDate}
            >
              <DatePicker disabled style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Form Action Buttons */}
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!canUpdateTender}
                  loading={loading}
                >
                  Update
                </Button>
                <Button
                  type="default"
                  htmlType="button"
                  onClick={() => form.resetFields()}
                  disabled={loading || !canUpdateTender}
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
