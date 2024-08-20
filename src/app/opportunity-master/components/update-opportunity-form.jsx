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
  SolutionSelector,
  SubSolutionSelector,
  SalesStageSelector,
  SalesSubStageSelector,
  StaffSelector,
  ClientSelector,
  TenderSelector,
} from "@/components";
import { RevenueInput } from "./revenueInput";
import { opportunityFormRules } from "@/utilities/formValidationRules";
import { updateOpportunity } from "@/redux/actions/opportunityAction";
import { opportunityActions } from "@/redux/slices/opportunitySlice";

export const UpdateOpportunityForm = ({ opportunity }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.opportunity.updateOpportunity
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (opportunity) {
      form.setFieldsValue({
        clientName: opportunity.clientName,
        partneredWith: opportunity.partneredWith,
        projectName: opportunity.projectName,
        associatedTender: opportunity.associatedTender,
        solution: opportunity.solution,
        subSolution: opportunity.subSolution,
        salesChamp: opportunity.salesChamp,
        salesStage: opportunity.salesStage,
        salesSubStage: opportunity.salesSubStage,
        stageClarification: opportunity.stageClarification,
        salesTopLine: opportunity.salesTopLine,
        offsets: opportunity.offsets,
        address: opportunity.address,
      });
    }
  }, [opportunity, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Opportunity updated successfully.",
      });
      dispatch(opportunityActions.clearUpdateOpportunityStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update opportunity.",
      });
      dispatch(opportunityActions.clearUpdateOpportunityStatus());
      dispatch(opportunityActions.clearUpdateOpportunityError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    const updatedValues = {
      ...values,
    };
    dispatch(updateOpportunity(opportunity._id, updatedValues));
  };

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
            <ClientSelector
              name="clientName"
              label="Client Name"
              rules={opportunityFormRules.clientName}
            />
          </Col>
          <Col span={8}>
            <Form.Item
              name="partneredWith"
              label="Partnered With"
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
            <StaffSelector
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
            <Form.Item
              name="salesTopLine"
              label="Sales Top-Line"
              rules={opportunityFormRules.salesTopLine}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="offsets"
              label="Offsets"
              rules={opportunityFormRules.offsets}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="address"
              label="Address"
              rules={opportunityFormRules.address}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* <Col span={24}>
            <RevenueInput initialValues={opportunity.revenue} />
          </Col> */}
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
    </Space>
  );
};