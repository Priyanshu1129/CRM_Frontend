"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Space,
  Grid,
  theme,
  Row,
  Col,
  notification,
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
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { createOpportunity } from "@/redux/actions/opportunityAction";

const AddOpportunity = () => {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(1);

  const { status, error } = useSelector(
    (state) => state.opportunity.createOpportunity
  );

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
        description: "Opportunity added successfully.",
      });
      dispatch(opportunityActions.clearCreateOpportunityStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add opportunity.",
      });
      dispatch(opportunityActions.clearCreateOpportunityStatus());
      dispatch(opportunityActions.clearCreateOpportunityError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    const salesTopLineInUSD = parseFloat(
      values?.salesTopLine / currency
    ).toFixed(2);
    const offsetsInUSD = parseFloat(values?.offsets / currency).toFixed(2);
    let newValues = {
      ...values,
      salesTopLine: salesTopLineInUSD,
      offsets: offsetsInUSD,
      entryDate: new Date().toISOString(),
    };
    dispatch(createOpportunity(newValues));
  };

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
          size={"default"}
          onFinish={onFinish}
        >
          <Row gutter={24}>
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
              <RevenueInput rules={opportunityFormRules.revenue} />
            </Col>
            <Col span={24}>
              <Form.Item>
                <Space>
                  <Button loading={false} type="primary" htmlType="submit">
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
