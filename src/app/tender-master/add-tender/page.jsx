"use client";
import React, { useState, useEffect, useCallback } from "react";
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
} from "antd";
import { StageSelector } from "./enums";
import { FormHeader } from "@/components";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { createTender } from "@/redux/actions/tenderAction";
import { tenderFormRules } from "@/utilities/formValidationRules";

const AddTender = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.tender.createTender);

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
        description: "Tender added successfully.",
      });
      dispatch(tenderActions.clearCreateTenderStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add tender.",
      });
      dispatch(tenderActions.clearCreateTenderStatus());
      dispatch(tenderActions.clearCreateTenderError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(createTender(values));
  };

  return (
    <>
      <FormHeader buttonText={"Cancel"} />
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
          size={"default"}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="rfpDate"
                label="RFP Date"
                rules={tenderFormRules.rfpDate}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="submissionDueDate"
                label="Submission Due Date"
                rules={tenderFormRules.submissionDueDate}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="client"
                label="Client Name"
                rules={tenderFormRules.clientName}
              >
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                  <Select.Option value={"F"}>Female</Select.Option>
                  <Select.Option value={"O"}>Other</Select.Option>
                </Select>
              </Form.Item>
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
              <Form.Item
                name="associatedOpportunity"
                label="Associated Opportunity"
                rules={tenderFormRules.associatedOpportunity}
              >
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="bond" label="Bond" rules={tenderFormRules.bond}>
                <Select>
                  <Select.Option value={"Yes"}>Yes</Select.Option>
                  <Select.Option value={"No"}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="bondValue"
                label="Bond Value"
                rules={tenderFormRules.bondValue}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="bondIssueDate"
                label="Bond Issue Date"
                rules={tenderFormRules.bondIssueDate}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="bondExpiry"
                label="Bond Valid Until"
                rules={tenderFormRules.bondValidUntil}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="submissionMode"
                label="Submission Mode"
                rules={tenderFormRules.submissionMode}
              >
                <Select>
                  <Select.Option value={"Mail"}>Mail</Select.Option>
                  <Select.Option value={"Online"}>Online</Select.Option>
                  <Select.Option value={"In Person"}>In Person</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="evaluationDate"
                label="Evaluation Date"
                rules={tenderFormRules.evaluationDate}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="officer"
                label="Tender Officer"
                rules={tenderFormRules.tenderOfficer}
              >
                <Select>
                  <Select.Option value={"John Doe"}>John Doe</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="bidManager"
                label="Bid Manager"
                rules={tenderFormRules.bidManager}
              >
                <Select>
                  <Select.Option value={"Jane Doe"}>Jane Doe</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="stage"
                label="Tender Stage"
                rules={tenderFormRules.tenderStage}
              >
                <StageSelector />
              </Form.Item>
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
                <Input />
              </Form.Item>
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
export default AddTender;
