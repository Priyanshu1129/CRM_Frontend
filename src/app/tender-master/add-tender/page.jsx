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
import { StageSelector } from "../enums";

import {
  ClientSelector,
  OpportunitySelector,
  UserSelector,
  FormHeader,
  BulkUploadModal,
  CurrencyAmountInput,
} from "@/components";
import { tenderFormRules } from "@/utilities/formValidationRules";
import { useAddTender } from "@/hooks/tender";

const AddTender = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, onFinish, currency, setCurrency } = useAddTender();

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
          onFinish={onFinish}
          layout="vertical"
          initialValues={{}}
          form={form}
          // size={"default"}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="rfpDate"
                label="RFP Date"
                rules={tenderFormRules.rfpDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="submissionDueDate"
                label="Submission Due Date"
                rules={tenderFormRules.submissionDueDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <ClientSelector
                name="client"
                label="Client Name"
                rules={tenderFormRules.clientName}
              />
            </Col>
            <Col span={8}>
              <Form.Item
                name="reference"
                label="Reference"
                rules={tenderFormRules.reference}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="rfpTitle"
                label="RFP Title"
                rules={tenderFormRules.rfpTitle}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="rfpSource"
                label="How did we receive RFP?"
                rules={tenderFormRules.rfpSource}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <OpportunitySelector
                name="associatedOpportunity"
                label="Associated Opportunity"
                rules={tenderFormRules.associatedOpportunity}
              />
            </Col>
            <Col span={8}>
              <Form.Item name="bond" label="Bond" rules={tenderFormRules.bond}>
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <CurrencyAmountInput
                name="bondValue"
                label="Bond Value"
                rules={tenderFormRules.bondValue}
                currency={currency}
                setCurrency={setCurrency}
              />
            </Col>
            <Col span={8}>
              <Form.Item
                name="bondIssueDate"
                label="Bond Issue Date"
                rules={tenderFormRules.bondIssueDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="bondExpiry"
                label="Bond Valid Until"
                rules={tenderFormRules.bondValidUntil}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                name="evaluationDate"
                label="Evaluation Date"
                rules={tenderFormRules.evaluationDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <UserSelector
                name="officer"
                label="Tender Officer"
                rules={tenderFormRules.tenderOfficer}
              />
            </Col>
            <Col span={8}>
              <UserSelector
                name="bidManager"
                label="Bid Manager"
                rules={tenderFormRules.bidManager}
              />
            </Col>
            <Col span={8}>
              <StageSelector
                name="stage"
                label="Tender Stage"
                rules={tenderFormRules.tenderStage}
              />
            </Col>
            <Col span={8}>
              <Form.Item
                name="stageExplanation"
                label="Stage Explanation"
                rules={tenderFormRules.stageExplanation}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
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
                    Submit
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
        <BulkUploadModal
          setUploadModal={setUploadModal}
          uploadModal={uploadModal}
          resource="tender"
        />
      </Space>
    </>
  );
};
export default AddTender;
