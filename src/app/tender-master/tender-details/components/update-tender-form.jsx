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
} from "antd";
import {
  ClientSelector,
  OpportunitySelector,
  UserSelector,
  CurrencyAmountInput,
} from "@/components";
import { StageSelector } from "../../enums";
import { tenderFormRules } from "@/utilities/formValidationRules";
import { useUpdateTender } from "@/hooks/tender";

export const UpdateTenderForm = ({ tender }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const [currency, setCurrency] = useState(1);

  const { loading, onFinish } = useUpdateTender({ tender, form, currency });

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <Form onFinish={onFinish} layout="vertical" form={form} 
      // size={"default"}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item
              name="rfpDate"
              label="RFP Date"
              rules={tenderFormRules.rfpDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="submissionDueDate"
              label="Submission Due Date"
              rules={tenderFormRules.submissionDueDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <ClientSelector
              name="client"
              label="Client Name"
              rules={tenderFormRules.clientName}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="reference"
              label="Reference"
              rules={tenderFormRules.reference}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="rfpTitle"
              label="RFP Title"
              rules={tenderFormRules.rfpTitle}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="rfpSource"
              label="How did we receive RFP?"
              rules={tenderFormRules.rfpSource}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <OpportunitySelector
              name="associatedOpportunity"
              label="Associated Opportunity"
              rules={tenderFormRules.associatedOpportunity}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item name="bond" label="Bond" rules={tenderFormRules.bond}>
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <CurrencyAmountInput
              name="bondValue"
              label="Bond Value"
              rules={tenderFormRules.bondValue}
              currency={currency}
              setCurrency={setCurrency}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="bondIssueDate"
              label="Bond Issue Date"
              rules={tenderFormRules.bondIssueDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="bondExpiry"
              label="Bond Valid Until"
              rules={tenderFormRules.bondValidUntil}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
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
          <Col span={colSpan}>
            <Form.Item
              name="evaluationDate"
              label="Evaluation Date"
              rules={tenderFormRules.evaluationDate}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <UserSelector
              name="officer"
              label="Tender Officer"
              rules={tenderFormRules.tenderOfficer}
            />
          </Col>
          <Col span={colSpan}>
            <UserSelector
              name="bidManager"
              label="Bid Manager"
              rules={tenderFormRules.bidManager}
            />
          </Col>
          <Col span={colSpan}>
            <StageSelector
              name="stage"
              label="Tender Stage"
              rules={tenderFormRules.tenderStage}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="stageExplanation"
              label="Stage Explanation"
              rules={tenderFormRules.stageExplanation}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="submissionDate"
              label="Submission Date"
              rules={tenderFormRules.submissionDate}
            >
              <DatePicker disabled style={{ width: "100%" }} />
            </Form.Item>
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
