"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Grid,
  theme,
  Row,
  Col,
} from "antd";

import { ListHeader } from "@/components";
import { RevenueInput } from "../components/revenueInput";
import {
  SolutionSelector,
  SubSolutionSelector,
  SalesStageSelector,
  SalesSubStageSelector,
} from "@/components";

const AddOpportunity = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          // labelCol={{
          //   span: 12,
          // }}
          // wrapperCol={{
          //   span: 12,
          // }}
          layout="vertical"
          initialValues={{}}
          onValuesChange={() => {}}
          size={"default"}
          style={
            {
              // maxWidth: 600,
            }
          }
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Client Name">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                  <Select.Option value={"F"}>Female</Select.Option>
                  <Select.Option value={"O"}>Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Partnered With">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Project Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Associated Tender">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                  <Select.Option value={"F"}>Female</Select.Option>
                  <Select.Option value={"O"}>Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Solution">
                <SolutionSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sub Solution">
                {/* <SubSolutionSelector /> */}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sales Champ">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sales Stage">
                <SalesStageSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sales Sub Stage">
                <SalesSubStageSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Stage Clarification">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sales Top-Line">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Offsets">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <RevenueInput />
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button>Save</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};
export default AddOpportunity;
