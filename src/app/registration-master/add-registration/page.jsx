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

import { ListHeader, InputNotes } from "@/components";
import { RegistrationStatusSelector } from "./enums";

const AddRegistration = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <ListHeader
        toPath={"add-registration"}
        buttonText={"Add new registration"}
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
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Registration Champ">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Registration Status">
                <RegistrationStatusSelector />
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
              <Form.Item label="Registered Username">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Registered Password">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Other Details">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Registered Date">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Valid Until">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Primary Registration Contact">
                <Select>
                  <Select.Option value={"M"}>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Submitted Documents">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Notes">
                <InputNotes />
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
export default AddRegistration;
