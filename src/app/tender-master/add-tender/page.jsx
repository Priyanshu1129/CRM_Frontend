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
  DatePicker,
  notification,
} from "antd";
import { StageSelector } from "../enums";
import {
  ClientSelector,
  OpportunitySelector,
  StaffSelector,
  FormHeader,
  BulkUploadModal,
} from "@/components";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { createTender } from "@/redux/actions/tenderAction";
import { tenderFormRules } from "@/utilities/formValidationRules";

const AddTender = () => {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
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
    const formattedValues = {
      ...values,
      rfpDate: values?.rfpDate.format("YYYY-MM-DD"),
      submissionDueDate: values?.submissionDueDate.format("YYYY-MM-DD"),
      submissionDate: values?.submissionDate.format("YYYY-MM-DD"),
      evaluationDate: values?.evaluationDate.format("YYYY-MM-DD"),
      bondIssueDate: values?.bondIssueDate.format("YYYY-MM-DD"),
      bondExpiry: values?.bondExpiry.format("YYYY-MM-DD"),
      entryDate: "2024-08-10T00:00:00.000Z",
      enteredBy: "64cf1c8a6e6e3c0b34a25f95",
    };
    dispatch(createTender(formattedValues));
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
              <Form.Item
                name="bondValue"
                label="Bond Value"
                rules={tenderFormRules.bondValue}
              >
                <Input type="number" />
              </Form.Item>
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
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <StaffSelector
                name="officer"
                label="Tender Officer"
                rules={tenderFormRules.tenderOfficer}
              />
            </Col>
            <Col span={8}>
              <StaffSelector
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
                <DatePicker style={{ width: "100%" }} />
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
                    loading={loading}
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
