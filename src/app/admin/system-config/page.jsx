"use client";
import React, { useEffect, useState } from "react";
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
  Divider,
} from "antd";
import {
  ClientSelector,
  OpportunitySelector,
  UserSelector,
  CurrencyAmountInput,
  Text,
  SalesSubStageSelector,
  FullScreenLoading,
} from "@/components";
import { StageSelector as TenderStageSelector } from "@/app/tender/enums";
import {
  opportunityFormRules,
  tenderFormRules,
} from "@/utilities/formValidationRules";
import { useUpdateTender } from "@/hooks/tender";
import { colorConfig } from "@/config";
import { useFetchSystemConfigDetails } from "@/hooks/systemConfig/useFetchSystemConfig";
import { useUpdateSystemConfig } from "@/hooks/systemConfig/useUpdateSystemConfig";

const UpdateSystemConfigForm = () => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const [currency, setCurrency] = useState(1);

  // const { loading, onFinish } = useUpdateTender({ tender, form, currency });
  const { loading: getSystemConfigLoading, systemConfig } =
    useFetchSystemConfigDetails();

  const { loading: updateLoading, onFinish } = useUpdateSystemConfig({
    systemConfig,
    form,
  });
  console.log("system config in : ", systemConfig);

  const handleOnFinishLocal = (values) => {
    console.log("system configg : ", values);
  };

  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 6, // 4 fields per row on desktop and larger
  };

  useEffect(() => {}, [systemConfig]);

  if (getSystemConfigLoading) return <FullScreenLoading />;

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        // size={"default"}
      >
        {/* Tender Stage Section */}
        <Space>
          <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
            Set System Configuration
          </Text>
        </Space>
        <Divider style={{ margin: "10px" }} />
        <Row gutter={24}>
          <Col {...colSpan}>
            <TenderStageSelector
              name="tenderSubmittedStage"
              label="Tender Submitted Stage"
              rules={tenderFormRules.tenderStage}
            />
          </Col>
          <Col {...colSpan}>
            <SalesSubStageSelector
              name="wonStage"
              label="Select Won Stage"
              rules={opportunityFormRules.salesSubStage}
            />
          </Col>
        </Row>

        {/* Form Action Buttons */}
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={getSystemConfigLoading}
                >
                  Update
                </Button>
                <Button
                  type="default"
                  htmlType="button"
                  onClick={() => form.resetFields()}
                  disabled={getSystemConfigLoading}
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div>
        {`${systemConfig?.wonStage} " ${systemConfig?.tenderSubmittedStage}`}
      </div>
    </>
  );
};

export default UpdateSystemConfigForm;
