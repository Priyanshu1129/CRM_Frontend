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

const AddStaff = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <ListHeader toPath={"add-staff"} buttonText={"Add new staff"} />
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
              <Form.Item label="First Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Last Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gender">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                  <Select.Option value={"F"}>Female</Select.Option>
                  <Select.Option value={"O"}>Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Role">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="DOB">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Address">
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
export default AddStaff;
