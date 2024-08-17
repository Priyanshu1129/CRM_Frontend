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

import { ListHeader } from "@/components";
import { RevenueInput } from "../components/revenueInput";
import {
  SolutionSelector,
  SubSolutionSelector,
  SalesStageSelector,
  SalesSubStageSelector,
  StaffSelector,
} from "@/components";
import { opportunityFormRules } from "@/utilities/formValidationRules";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { createOpportunity } from "@/redux/actions/opportunityAction";

const AddOpportunity = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

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
    dispatch(createOpportunity(values));
  };

  return (
    <>
      <ListHeader
        toPath={"add-opportunity"}
        buttonText={"Add new opportunity"}
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
              <Form.Item
                name="clientName"
                label="Client Name"
                rules={opportunityFormRules.clientName}
              >
                <Select>
                  <Select.Option value={"c1"}>C1</Select.Option>
                </Select>
              </Form.Item>
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
              <Form.Item
                name="associatedTender"
                label="Associated Tender"
                rules={opportunityFormRules.associatedTender}
              >
                <Select>
                  <Select.Option value={"t1"}>T1</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="solution"
                label="Solution"
                rules={opportunityFormRules.solution}
              >
                <SolutionSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="subSolution"
                label="Sub Solution"
                rules={opportunityFormRules.subSolution}
              >
                <SubSolutionSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="salesChamp"
                label="Sales Champ"
                rules={opportunityFormRules.salesChamp}
              >
                <StaffSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="salesStage"
                label="Sales Stage"
                rules={opportunityFormRules.salesStage}
              >
                <SalesStageSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="salesSubStage"
                label="Sales Sub Stage"
                rules={opportunityFormRules.salesSubStage}
              >
                <SalesSubStageSelector />
              </Form.Item>
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="offsets"
                label="Offsets"
                rules={opportunityFormRules.offsets}
              >
                <Input />
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
            <Col span={24}>
              <RevenueInput />
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="button"
                  onClick={() => form.resetFields()}
                  loading={loading}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default AddOpportunity;
