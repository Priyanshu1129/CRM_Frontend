"use client";
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Grid,
  theme,
  Row,
  Col,
  DatePicker,
} from "antd";
import { FormHeader, BulkUploadModal } from "@/components";
import { RevenueInput } from "../components/revenueInput";
import {
  SolutionSelector,
  SubSolutionSelector,
  SalesStageSelector,
  SalesSubStageSelector,
  UserSelector,
  ClientSelector,
  TenderSelector,
  CurrencyAmountInput,
} from "@/components";
import { opportunityFormRules } from "@/utilities/formValidationRules";
import { useAddOpportunity } from "@/hooks/opportunity/useAddOpportunity";
import moment from "moment";

const AddOpportunity = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, onFinish, currency, setCurrency } = useAddOpportunity();

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
          initialValues={{}}
          form={form}
          // size={"default"}
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="entryDate" label="Entry Date">
                <DatePicker defaultValue={moment()} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <ClientSelector
                name="client"
                label="Client Name"
                rules={opportunityFormRules.clientName}
              />
            </Col>
            <Col span={8}>
              <Form.Item
                name="partneredWith"
                label="In Partnership"
                rules={opportunityFormRules.partneredWith}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="projectName"
                label="Project Name"
                rules={opportunityFormRules.projectName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <TenderSelector
                name="associatedTender"
                label="Associated Tender"
                rules={opportunityFormRules.associatedTender}
              />
            </Col>
            <Col span={8}>
              <SolutionSelector
                name="solution"
                label="Solution"
                rules={opportunityFormRules.solution}
              />
            </Col>
            <Col span={8}>
              <SubSolutionSelector
                name="subSolution"
                label="Sub Solution"
                rules={opportunityFormRules.subSolution}
              />
            </Col>
            <Col span={8}>
              <UserSelector
                name="salesChamp"
                label="Sales Champ"
                rules={opportunityFormRules.salesChamp}
              />
            </Col>
            <Col span={8}>
              <SalesStageSelector
                name="salesStage"
                label="Sales Stage"
                rules={opportunityFormRules.salesStage}
              />
            </Col>
            <Col span={8}>
              <SalesSubStageSelector
                name="salesSubStage"
                label="Sales Sub Stage"
                rules={opportunityFormRules.salesSubStage}
              />
            </Col>
            <Col span={8}>
              <Form.Item
                name="stageClarification"
                label="Stage Clarification"
                rules={opportunityFormRules.stageClarification}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <CurrencyAmountInput
                name="salesTopLine"
                label="Sales Top-Line"
                rules={opportunityFormRules.salesTopLine}
                currency={currency}
                setCurrency={setCurrency}
              />
            </Col>
            <Col span={8}>
              <CurrencyAmountInput
                name="offsets"
                label="Offsets"
                rules={opportunityFormRules.offsets}
                currency={currency}
                setCurrency={setCurrency}
              />
            </Col>
            <Col span={24}>
              <RevenueInput
                currency={currency}
                setCurrency={setCurrency}
                rules={opportunityFormRules.revenue}
              />
            </Col>
            <Col span={24}>
              <Form.Item>
                <Space>
                  <Button loading={loading} type="primary" htmlType="submit">
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
          resource="opportunity"
        />
      </Space>
    </>
  );
};

export default AddOpportunity;
