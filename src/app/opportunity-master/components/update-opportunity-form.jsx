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
  notification,
} from "antd";

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
import { RevenueInput } from "./revenueInput";
import { opportunityFormRules } from "@/utilities/formValidationRules";
import { convertToUSD } from "@/utilities/convertCurrency";
import {
  updateOpportunity,
  getAllOpportunities,
} from "@/redux/actions/opportunityAction";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import {
  getChangedValues,
  getDeletedRevenue,
} from "@/utilities/getChangedValues";

export const UpdateOpportunityForm = ({ opportunity }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(1);

  const { status, error } = useSelector(
    (state) => state.opportunity.updateOpportunity
  );

  const initialValues = useRef({});

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (opportunity) {
      const opportunityInitialValues = {
        client: opportunity.client,
        partneredWith: opportunity.partneredWith,
        projectName: opportunity.projectName,
        associatedTender: opportunity.associatedTender,
        solution: opportunity.solution,
        subSolution: opportunity.subSolution,
        salesChamp: opportunity.salesChamp,
        salesStage: opportunity.salesStage,
        salesSubStage: opportunity.salesSubStage,
        stageClarification: opportunity.stageClarification,
        salesTopLine: opportunity.salesTopLine * currency,
        offsets: opportunity.offsets * currency,
        revenue: opportunity.revenue * currency,
      };
      form.setFieldsValue(opportunityInitialValues);
      initialValues.current = opportunityInitialValues;
    }
  }, [opportunity, form, currency]);

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
      dispatch(getAllOpportunities({}));
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

    const changedValues = getChangedValues(initialValues, values);

    const initialRevenue = initialValues.current.revenue || [];
    const updatedRevenue = values.revenue || [];

    // Identify deleted items
    // const deletedRevenue = getDeletedRevenue(initialRevenue, updatedRevenue);
    const deletedRevenue = initialRevenue
      .filter(
        (initialItem) =>
          !updatedRevenue.some(
            (updatedItem) => updatedItem._id === initialItem._id
          )
      )
      .map((item) => ({
        ...item,
        delete: true,
      }));

    // const changedRevenue = getChangedValues(initialRevenue, updatedRevenue);
    const changedRevenue = updatedRevenue.filter((updatedItem) => {
      const initialItem = initialRevenue.find(
        (item) => item._id === updatedItem._id
      );

      return (
        !initialItem ||
        JSON.stringify(updatedItem) !== JSON.stringify(initialItem)
      );
    });

    // Merge the results into changedValues
    if (changedRevenue.length || deletedRevenue.length) {
      changedValues.revenue = [...changedRevenue, ...deletedRevenue];
    }

    // Dispatch only if there are changed values
    if (Object.keys(changedValues).length > 0) {
      if (changedValues.offsets) {
        changedValues.offsets = parseFloat(values?.offsets / currency).toFixed(
          2
        );
      }
      if (changedValues.salesTopLine) {
        changedValues.salesTopLine = parseFloat(
          values?.salesTopLine / currency
        ).toFixed(2);
      }
      if (changedValues.revenue) {
        changedValues.revenue = convertToUSD(values.revenue, currency);
      }
      dispatch(updateOpportunity(changedValues, opportunity._id));
    } else {
      setLoading(false);
      notification.info({
        message: "No Changes",
        description: "No changes were made.",
      });
    }
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
            <RevenueInput
              setCurrency={setCurrency}
              rules={opportunityFormRules.revenue}
            />
          </Col>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  // disabled
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
                  disabled={loading}
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
