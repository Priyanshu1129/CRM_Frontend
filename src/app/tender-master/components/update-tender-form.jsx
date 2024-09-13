"use client";
import React, { useState, useEffect, useRef } from "react";
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
import {
  ClientSelector,
  OpportunitySelector,
  UserSelector,
} from "@/components";
import { StageSelector } from "../enums";
import moment from "moment";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { updateTender, getAllTenders } from "@/redux/actions/tenderAction";
import { tenderFormRules } from "@/utilities/formValidationRules";
import { getChangedValues } from "@/utilities/getChangedValues";

export const UpdateTenderForm = ({ tender }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.tender.updateTender);

  const initialValues = useRef({});

  useEffect(() => {
    if (tender) {
      const tenderInitialValues = {
        rfpDate: tender.rfpDate ? moment(tender.rfpDate) : null,
        submissionDueDate: tender.submissionDueDate
          ? moment(tender.submissionDueDate)
          : null,
        submissionDate: tender.submissionDate
          ? moment(tender.submissionDate)
          : null,
        evaluationDate: tender.evaluationDate
          ? moment(tender.evaluationDate)
          : null,
        bondIssueDate: tender.bondIssueDate
          ? moment(tender.bondIssueDate)
          : null,
        bondExpiry: tender.bondExpiry ? moment(tender.bondExpiry) : null,
        client: tender.client,
        reference: tender.reference,
        rfpTitle: tender.rfpTitle,
        rfpSource: tender.rfpSource,
        associatedOpportunity: tender.associatedOpportunity,
        bond: tender.bond,
        bondValue: tender.bondValue,
        submissionMode: tender.submissionMode,
        officer: tender.officer,
        bidManager: tender.bidManager,
        stage: tender.stage,
        stageExplanation: tender.stageExplanation,
      };
      form.setFieldsValue(tenderInitialValues);
      initialValues.current = tenderInitialValues;
    }
  }, [tender, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Tender updated successfully.",
      });
      dispatch(getAllTenders({}));
      dispatch(tenderActions.clearUpdateTenderStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update tender.",
      });
      dispatch(tenderActions.clearUpdateTenderStatus());
      dispatch(tenderActions.clearUpdateTenderError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);

    const changedValues = getChangedValues(initialValues, values);

    console.log("Changed values:", changedValues);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      dispatch(updateTender(changedValues, tender._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
  };

  const colSpan = screens.xs ? 24 : screens.sm ? 12 : screens.md && 8;

  return (
    <>
      <Form onFinish={onFinish} layout="vertical" form={form} size={"default"}>
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
            <Form.Item
              name="bondValue"
              label="Bond Value"
              rules={tenderFormRules.bondValue}
            >
              <Input type="number" />
            </Form.Item>
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
