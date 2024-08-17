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

import { FormHeader } from "@/components";
import { RevenueInput } from "../components/revenueInput";
import {
  IndustrySelector,
  InputNotes,
  SolutionSelector,
  SubSolutionSelector,
  TerritorySelector,
  StaffSelector,
} from "@/components";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { createBusinessDevelopment } from "@/redux/actions/businessDevelopmentAction";
import { businessDevelopmentFormRules } from "@/utilities/formValidationRules";
const AddBusinessDevelopment = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.businessDevelopment.createBusinessDevelopment
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
        description: "Business development added successfully.",
      });
      dispatch(
        businessDevelopmentActions.clearCreateBusinessDevelopmentStatus()
      );
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add business development.",
      });
      dispatch(
        businessDevelopmentActions.clearCreateBusinessDevelopmentStatus()
      );
      dispatch(
        businessDevelopmentActions.clearCreateBusinessDevelopmentError()
      );
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    // setLoading(true);
    console.log("submitted-values", values);
    // dispatch(createBusinessDevelopment(values));
  };
  // const StaffSelector = () => {
  //   return (
  //     <Select defaultValue="df" value="sdsdf">
  //       <Select.Option value="1">Jhn Doe</Select.Option>
  //       <Select.Option value="2">Jane Smith</Select.Option>
  //     </Select>
  //   );
  // };

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
          // labelCol={{
          //   span: 12,
          // }}
          // wrapperCol={{
          //   span: 12,
          // }}
          layout="vertical"
          initialValues={{}}
          onFinish={onFinish}
          size={"default"}
          form={form}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="client"
                label="Client Name"
                rules={businessDevelopmentFormRules.client}
              >
                <Select placeholder="Select Client"></Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="contact"
                label="Contact Name"
                rules={businessDevelopmentFormRules.contact}
              >
                <Select placeholder="Select Contact">
                  {/* Populate with contact options */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="connectionSource"
                label="How did we connect with client?"
                rules={businessDevelopmentFormRules.connectionSource}
              >
                <Input placeholder="Connection Source" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="potentialProject"
                label="Potential Project"
                rules={businessDevelopmentFormRules.potentialProject}
              >
                <Input placeholder="Potential Project" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <SolutionSelector
                name="solution"
                label="Solution"
                rules={businessDevelopmentFormRules.solution}
              />
            </Col>
            <Col span={8}>
              <SubSolutionSelector
                name="subSolution"
                label="Sub Solution"
                rules={businessDevelopmentFormRules.subSolution}
              />
            </Col>
            <Col span={8}>
              <IndustrySelector
                name="industry"
                label="Industry"
                rules={businessDevelopmentFormRules.industry}
              />
            </Col>
            <Col span={8}>
              <TerritorySelector
                name="territory"
                label="Territory"
                rules={businessDevelopmentFormRules.territory}
              />
            </Col>
            <Col span={8}>
              <StaffSelector
                name="salesChamp"
                label="Sales Champ"
                rules={businessDevelopmentFormRules.salesChamp}
              />
            </Col>
            <Col span={8}>
              <Form.Item
                name="potentialTopLine"
                label="Potential TopLine"
                rules={businessDevelopmentFormRules.potentialTopLine}
              >
                <Input placeholder="Potential TopLine" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="potentialOffset"
                label="Potential Offsets"
                rules={businessDevelopmentFormRules.potentialOffset}
              >
                <Input placeholder="Potential Offsets" />
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item
                name="Notes"
                label="Notes"
                rules={businessDevelopmentFormRules.Notes}
              >
                <InputNotes />
              </Form.Item>
            </Col> */}

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
export default AddBusinessDevelopment;
