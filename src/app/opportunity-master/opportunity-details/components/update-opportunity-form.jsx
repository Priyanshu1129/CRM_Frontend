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
  SolutionSelector,
  SubSolutionSelector,
  SalesStageSelector,
  SalesSubStageSelector,
  UserSelector,
  ClientSelector,
  TenderSelector,
  CurrencyAmountInput,
} from "@/components";
import { RevenueInput } from "../../components/revenueInput";
import { opportunityFormRules } from "@/utilities/formValidationRules";
import { useUpdateOpportunity } from "@/hooks/opportunity";

export const UpdateOpportunityForm = ({ opportunity }) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const [currency, setCurrency] = useState(1);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, onFinish } = useUpdateOpportunity({
    opportunity,
    currency,
    form,
  });

  return (
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
      <Form layout="vertical" form={form} size={"default"} onFinish={onFinish}>
        <Row gutter={24}>
        <Col span={8}>
              <Form.Item
                name="updateDate"
                label="Entry Date"
              >
                <DatePicker style={{ width: "100%" }} />
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
              setCurrency={setCurrency}
              rules={opportunityFormRules.revenue}
            />
          </Col>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  // disabled
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
                  disabled={loading}
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};
