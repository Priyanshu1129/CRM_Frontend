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
import { StageSelector } from "./enums";

import { ListHeader } from "@/components";

const AddContact = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <ListHeader toPath={"add-tender"} buttonText={"Add new tender"} />
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
              <Form.Item label="RFP Date">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Submission Due Date">
                <Input />
              </Form.Item>
            </Col>
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
              <Form.Item label="Reference">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="RFP Title">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="rfpSource" label="How did we received RFP ?">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Associated Opportunity">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bond">
                <Select>
                  <Select.Option value={"M"}>Yes</Select.Option>
                  <Select.Option value={"M"}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bond Value">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bond Issue Date">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bond Valid Until">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Submission Mode">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                  <Select.Option value={"F"}>Female</Select.Option>
                  <Select.Option value={"O"}>Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Evaluation Date">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tender Officer">
                <Select>
                  <Select.Option value={"M"}>Yes</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bid Manager">
                <Select>
                  <Select.Option value={"M"}>Yes</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tender Stage">
                <StageSelector />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Stage Explanation">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Submission Date">
                <Input />
              </Form.Item>
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
export default AddContact;
