"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Space, Grid, Row, Col, notification } from "antd";
import {
  IndustrySelector,
  SolutionSelector,
  SubSolutionSelector,
  TerritorySelector,
  UserSelector,
  ClientSelector,
  ContactSelector,
  InputNotes,
  CurrencyAmountInput,
} from "@/components";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { businessDevelopmentFormRules } from "@/utilities/formValidationRules";
import {
  updateBusinessDevelopment,
  getAllBusinessDevelopments,
} from "@/redux/actions/businessDevelopmentAction";
import { getChangedValues } from "@/utilities/getChangedValues";

export const UpdateBusinessDevelopmentForm = ({ businessDevelopment }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(1);

  const { status, error } = useSelector(
    (state) => state.businessDevelopment.updateBusinessDevelopment
  );

  const initialValues = useRef({});

  useEffect(() => {
    if (businessDevelopment) {
      const businessDevelopmentInitialValues = {
        client: businessDevelopment.client,
        contact: businessDevelopment.contact,
        connectionSource: businessDevelopment.connectionSource,
        potentialProject: businessDevelopment.potentialProject,
        solution: businessDevelopment.solution,
        subSolution: businessDevelopment.subSolution,
        industry: businessDevelopment.industry,
        territory: businessDevelopment.territory,
        salesChamp: businessDevelopment.salesChamp,
        potentialTopLine: businessDevelopment.potentialTopLine * currency,
        potentialOffset: businessDevelopment.potentialOffset * currency,
        Notes: businessDevelopment.Notes,
      };
      form.setFieldsValue(businessDevelopmentInitialValues);
      initialValues.current = businessDevelopmentInitialValues;
    }
  }, [businessDevelopment, form, currency]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Business development updated successfully.",
      });
      dispatch(getAllBusinessDevelopments({}));
      dispatch(
        businessDevelopmentActions.clearUpdateBusinessDevelopmentStatus()
      );
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update business development.",
      });
      dispatch(
        businessDevelopmentActions.clearUpdateBusinessDevelopmentStatus()
      );
      dispatch(
        businessDevelopmentActions.clearUpdateBusinessDevelopmentError()
      );
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    setLoading(true);

    const changedValues = getChangedValues(initialValues, values);

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      if (changedValues.potentialTopLine) {
        changedValues.potentialTopLine = parseFloat(
          values?.potentialTopLine / currency
        ).toFixed(2);
      }
      if (changedValues.potentialOffset) {
        changedValues.potentialOffset = parseFloat(
          values?.potentialOffset / currency
        ).toFixed(2);
      }
      dispatch(
        updateBusinessDevelopment(changedValues, businessDevelopment._id)
      );
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
      <Form form={form} layout="vertical" onFinish={onFinish} size="default">
        <Row gutter={24}>
          <Col span={colSpan}>
            <ClientSelector
              name="client"
              label="Client Name"
              rules={businessDevelopmentFormRules.client}
            />
          </Col>
          <Col span={colSpan}>
            <ContactSelector
              name="contact"
              label="Contact Name"
              rules={businessDevelopmentFormRules.contact}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="connectionSource"
              label="How did we connect with client?"
              rules={businessDevelopmentFormRules.connectionSource}
            >
              <Input placeholder="Connection Source" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="potentialProject"
              label="Potential Project"
              rules={businessDevelopmentFormRules.potentialProject}
            >
              <Input placeholder="Potential Project" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <SolutionSelector
              name="solution"
              label="Solution"
              rules={businessDevelopmentFormRules.solution}
            />
          </Col>
          <Col span={colSpan}>
            <SubSolutionSelector
              name="subSolution"
              label="Sub Solution"
              rules={businessDevelopmentFormRules.subSolution}
            />
          </Col>
          <Col span={colSpan}>
            <IndustrySelector
              name="industry"
              label="Industry"
              rules={businessDevelopmentFormRules.industry}
            />
          </Col>
          <Col span={colSpan}>
            <TerritorySelector
              name="territory"
              label="Territory"
              rules={businessDevelopmentFormRules.territory}
            />
          </Col>
          <Col span={colSpan}>
            <UserSelector
              name="salesChamp"
              label="Sales Champ"
              rules={businessDevelopmentFormRules.salesChamp}
            />
          </Col>
          <Col span={colSpan}>
            <CurrencyAmountInput
              name="potentialTopLine"
              label="Potential TopLine"
              rules={businessDevelopmentFormRules.potentialTopLine}
              currency={currency}
              setCurrency={setCurrency}
            />
          </Col>
          <Col span={colSpan}>
            <CurrencyAmountInput
              name="potentialOffset"
              label="Potential Offsets"
              rules={businessDevelopmentFormRules.potentialOffset}
              currency={currency}
              setCurrency={setCurrency}
            />
          </Col>
          <Col span={24}>
            <Form.Item
              name="Notes"
              label="Notes"
              rules={businessDevelopmentFormRules.Notes}
            >
              <InputNotes />
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
