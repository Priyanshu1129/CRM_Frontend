"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Space, Grid, Row, Col, notification } from "antd";
import {
  IndustrySelector,
  SolutionSelector,
  SubSolutionSelector,
  TerritorySelector,
  StaffSelector,
  ClientSelector,
  ContactSelector,
  InputNotes,
} from "@/components";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { businessDevelopmentFormRules } from "@/utilities/formValidationRules";
import { updateBusinessDevelopment } from "@/redux/actions/businessDevelopmentAction";

export const UpdateBusinessDevelopmentForm = ({ businessDevelopment }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.businessDevelopment.updateBusinessDevelopment
  );

  useEffect(() => {
    if (businessDevelopment) {
      form.setFieldsValue({
        client: businessDevelopment.client,
        contact: businessDevelopment.contact,
        connectionSource: businessDevelopment.connectionSource,
        potentialProject: businessDevelopment.potentialProject,
        solution: businessDevelopment.solution,
        subSolution: businessDevelopment.subSolution,
        industry: businessDevelopment.industry,
        territory: businessDevelopment.territory,
        salesChamp: businessDevelopment.salesChamp,
        potentialTopLine: businessDevelopment.potentialTopLine,
        potentialOffset: businessDevelopment.potentialOffset,
        Notes: businessDevelopment.Notes,
      });
    }
  }, [businessDevelopment, form]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Business development updated successfully.",
      });
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
    const updatedValues = {
      ...businessDevelopment,
      ...values,
    };
    dispatch(updateBusinessDevelopment(updatedValues));
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
            <StaffSelector
              name="salesChamp"
              label="Sales Champ"
              rules={businessDevelopmentFormRules.salesChamp}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="potentialTopLine"
              label="Potential TopLine"
              rules={businessDevelopmentFormRules.potentialTopLine}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="potentialOffset"
              label="Potential Offsets"
              rules={businessDevelopmentFormRules.potentialOffset}
            >
              <Input type="number" />
            </Form.Item>
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
                  loading={loading}
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
